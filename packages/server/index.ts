import dotenv from 'dotenv'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { createClientAndConnect } from './db'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import express from 'express'
import { store } from './service/store'

dotenv.config()

createClientAndConnect()

const isDev = () => process.env.NODE_ENV === 'development' // определяем режим разработки

async function startServer() {
  const app = express()

  const clientPath = path.dirname(
    require.resolve('client/client-dist/index.html')
  ) // путь к клиентскому билду

  const srcPath = path.dirname(require.resolve('client')) // путь к исходникам
  const ssrPath = require.resolve('client/ssr-dist/client.cjs') //путь к серверному билду

  let vite: ViteDevServer | undefined // инициализируем вит
  const port = Number(process.env.SERVER_PORT) || 3000

  app.use(cors())

  if (isDev()) {
    // если в режиме разработки, то создаем сервер вит из коробки
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      root: srcPath,
    })

    app.use(vite.middlewares)
  }

  // https://youtu.be/G-HHcOwNjZs?si=nXNOu38bi-28mV8u&t=650
  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  )

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(clientPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string
      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (url: string, store: any) => Promise<string>
      if (!isDev()) {
        render = (await import(ssrPath)).render
      } else {
        //    Load the server entry. ssrLoadModule automatically transforms
        //    ESM source code to be usable in Node.js! There is no bundling
        //    required, and provides efficient invalidation similar to HMR.
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render
      }

      // вызываем метод рендер и прокидываем путь. Из client/ssr.tsx
      const appHtml = await render(url, store)

      // Inject the app-rendered HTML into the template.
      const html = template.replace('<!--ssr-outlet-->', appHtml)

      // Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e: any) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e)
      }

      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
