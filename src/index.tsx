import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import store from './redux/Store/store'
import './styles/index.css'
import './styles/style.scss'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
