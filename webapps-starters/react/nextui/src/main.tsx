// main.tsx or main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider className="min-h-screen min-w-screen antialiased bg-black dark">
      <App />
    </NextUIProvider>
  </React.StrictMode>,
)