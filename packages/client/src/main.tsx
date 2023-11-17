import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import { initStore } from './store/store'
import '@styles/styles.less'
import GETTopicsEXAMPLE from './GETTopicsEXAMPLE'

if ('serviceWorker' in navigator && !(import.meta as any).env.DEV) {
  window.addEventListener('load', () => {
    const SW = new URL('../sw.js', import.meta.url).href
    navigator.serviceWorker
      .register(SW, { scope: './' })
      .then(registration => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error)
      })
  })
}

// @ts-ignore

const store = initStore(JSON.parse(window.__PRELOADED_STATE__))

// @ts-ignore
delete window.__PRELOADED_STATE__

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
      {/* Удалить, пример работы с беком */}
      {/* <GETTopicsEXAMPLE /> */}
    </BrowserRouter>
  </Provider>
)
