import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// En producción el HTML viene prerenderizado: se hidrata. En desarrollo se monta normalmente.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
