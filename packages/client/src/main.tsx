import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './services/store'
import { Provider } from 'react-redux'
import '@styles/styles.less'

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

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
