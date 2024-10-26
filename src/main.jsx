import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import GlobalStateProvider from "./Contexts/Login/CheckLoginContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div className='w-full text-center'>Loading.....</div>}>
      <BrowserRouter>
        <GlobalStateProvider>
          <App />
        </GlobalStateProvider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
)
