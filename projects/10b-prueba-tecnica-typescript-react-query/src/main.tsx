import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

/* crear un nuevo cliente */
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  /* el provider de react-query */
  <QueryClientProvider client={queryClient}>
    <App />
    {/* las devtools de react-query */}
    <ReactQueryDevtools />
  </QueryClientProvider>
)
