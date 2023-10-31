import { BrowserRouter as Router } from 'react-router-dom'

import AuthenticatedApp from './components/AuthenticatedApp/AuthenticatedApp'

const App = () => {
  return (
    <Router>
      <AuthenticatedApp />
    </Router>
  )
}

export default App
