import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./styles/loader.scss"
import { AuthProvider } from './context/AuthContext.jsx';
import {Toaster} from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster 
      position='top-right'
      toastOptions={{
        duration: 3000,
      }}
    />
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
