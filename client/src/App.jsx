import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// PAGES
import Home from './Pages/Home'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import UpdateStory from './Pages/UpdateStory'
import CreateStory from './Pages/CreateStory'
import StoryPage from './Pages/StoryPage'

// COMPONENTS
import Header from './Components/Header'
import FooterComponent from './Components/FooterComponent'
import PrivateRoute from './Components/PrivateRoute'
import OnlyAdminRoute from './Components/OnlyAdminRoute'
import ScrollToTop from './Components/ScrollToTop'
import Search from './Components/Search'


function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header/>
        <Routes>
          <Route path='/' element = { <Home/> } />
          <Route path='/about' element = { <About/> } />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminRoute />}>
            <Route path='/create-story' element={<CreateStory />} />
            <Route path="/update-story/:storyId" element={<UpdateStory />} />
          </Route>
          <Route path='/projects' element = { <Projects/> } />
          <Route path='/sign-in' element = { <SignIn/> } />
          <Route path='/signUp' element = { <SignUp/> } />
          <Route path='/search' element={<Search />} />
          <Route path="/story/:storySlug" element={<StoryPage />} />
        </Routes>
      <FooterComponent/>
    </BrowserRouter>
  )
}

export default App
