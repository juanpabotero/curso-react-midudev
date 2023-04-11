import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  /* debemos envolver la aplicacion con un provider para poder leer 
  el estado desde cualquier parte y mandar acciones para generar 
  nuevos estados */
  <Provider store={store}>
    <App />
  </Provider>
)
