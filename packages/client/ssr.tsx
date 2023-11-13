import React from 'react'
import App from './src/App'
import { StaticRouter } from 'react-router-dom/server'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { store } from './src/services/store'

export function render(uri) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={uri}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
}
