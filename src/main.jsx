import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import storeUtils from '../src/utils/storeUtils.jsx'
import memoryUtils from '../src/utils/memoryUtils.jsx'
import './index.css'

const user = storeUtils.getUser()
memoryUtils.user=user


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
