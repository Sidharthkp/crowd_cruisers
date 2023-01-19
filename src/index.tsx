import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { FirebaseContext } from './store/FirebaseContext'
import {auth}  from './firebase/config'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{auth}}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
)
