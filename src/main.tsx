import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/indexes/AppRoutes'
import ProvidersIndex from './components/indexes/ProvidersIndex'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProvidersIndex>
        <AppRoutes />
      </ProvidersIndex>
    </BrowserRouter>
  </React.StrictMode>
)