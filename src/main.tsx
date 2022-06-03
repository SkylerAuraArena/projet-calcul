import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ProvidersIndex from './components/indexes/ProvidersIndex'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProvidersIndex>
      <App />
    </ProvidersIndex>
  </React.StrictMode>
)