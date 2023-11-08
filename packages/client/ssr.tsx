import React from 'react'
import App from './src/App'
import { StaticRouter } from 'react-router-dom/server'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'

export function render(uri, store) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={uri}>
        <App />
      </StaticRouter>
    </Provider>
  )
}
