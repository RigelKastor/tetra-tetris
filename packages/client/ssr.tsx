import React from 'react'
import App from './src/App'
import { StaticRouter } from 'react-router-dom/server'
import ReactDOMServer from 'react-dom/server'

export function render(uri) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={uri}>
      <App />
    </StaticRouter>
  )
}
