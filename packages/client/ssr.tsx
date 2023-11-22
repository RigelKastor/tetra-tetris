import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import App from './src/App'
import { initStore } from './src/store/store'

async function render(uri: string) {
  const store = initStore({
    User: { theme: 'default' },
  })
  const initialState = store.getState()
  const renderResult = renderToString(
    <StaticRouter location={uri}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )

  return [initialState, renderResult]
}

export { render }
