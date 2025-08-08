import './App.css'
import GetProfile from './components/GetProfile'
import RedirectToGitHub from './components/RedirectToGitHub'

function App() {

  return (
    <>
    <h1>Hello GitHub OAuth 2.0</h1>
    <RedirectToGitHub />
    </>
  )
}

export default App
