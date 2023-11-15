import dotenv from 'dotenv'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { createClientAndConnect } from './db'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import { store } from './service/store'
import express from 'express'
import { commentReactionsRouter } from './forum/controllers/commentReactionsController'
import { reactionsRouter } from './forum/controllers/reactionsController'
import { topicRouter } from './forum/controllers/topicController'
import { commentRouter } from './forum/controllers/commentController'

dotenv.config()

createClientAndConnect()

const isDev = () => process.env.NODE_ENV === 'development' // определяем режим разработки

async function startServer() {
  const app = express()
  const clientPath = path.dirname(
    require.resolve('client/client-dist/index.html')
  ) // путь к клиентскому билду
  const ssrPath = require.resolve('client/ssr-dist/client.cjs') //путь к серверному билду
  let srcPath = ''
  if (isDev()) {
    srcPath = path.dirname(require.resolve('client')) // путь к исходникам
  }
  let vite: ViteDevServer | undefined // инициализируем вит
  const port = Number(process.env.SERVER_PORT) || 3000

  const router = express.Router()

  router.use(express.json())

  commentReactionsRouter(router)
  reactionsRouter(router)
  topicRouter(router)
  commentRouter(router)

  app.use(router)
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
    // подключаем статику
    app.use('/assets', express.static(path.resolve(clientPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string
      if (!isDev()) {
        // если прод режим, то берем готовый билд для прода (clientPath)
        template = fs.readFileSync(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )
      } else {
        // если дев режим, берем исходники
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (url: string, store: object) => Promise<string>
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
