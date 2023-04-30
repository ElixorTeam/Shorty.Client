import { BrowserRouter as Router } from 'react-router-dom'
import App from '@/App'
import '@/utils/metrika.js'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <App />
  </Router>
)
