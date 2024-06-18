import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// PAGES
import Home from './Pages/Home'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'

// COMPONENTS
import Header from './Components/Header'
import FooterComponent from './Components/FooterComponent'

function App() {

  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element = { <Home/> } />
          <Route path='/about' element = { <About/> } />
          <Route path='/dashboard' element = { <Dashboard/> } />
          <Route path='/projects' element = { <Projects/> } />
          <Route path='/sign-in' element = { <SignIn/> } />
          <Route path='/signUp' element = { <SignUp/> } />
        </Routes>
      <FooterComponent/>
    </BrowserRouter>
  )
}

export default App
