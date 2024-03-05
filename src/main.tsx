import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app.tsx'
import { store } from './state/store.ts'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
