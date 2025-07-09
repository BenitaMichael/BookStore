import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// PAGES
import Home from './Pages/Home'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import ContactPage from './Pages/Contact'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import UpdateStory from './Pages/UpdateStory'
import CreateStory from './Pages/CreateStory'
import StoryPage from './Pages/StoryPage'
import ForgotPassword from './Pages/ForgotPassword'
import NotFound from './Pages/NotFound'

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
          <Route path='/contact' element = { <ContactPage/> } />
          <Route path='/sign-in' element = { <SignIn/> } />
          <Route path='/signUp' element = { <SignUp/> } />
          <Route path='/search' element={<Search />} />
          <Route path="/story/:storySlug" element={<StoryPage />} />
          <Route path='/forgot-password' element = { <ForgotPassword/> } />
          <Route path='*' element = { <NotFound/> } />
        </Routes>
      <FooterComponent/>
    </BrowserRouter>
  )
}

export default App
