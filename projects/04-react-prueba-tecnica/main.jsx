import { createRoot } from 'react-dom/client'
import { App } from './src/App.jsx'

// selecciono el elemento donde quiero renderizar mi app
const root = createRoot(document.getElementById('app'))

root.render(<App />)
