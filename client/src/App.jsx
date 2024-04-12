import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import FooterComponent  from './components/FooterComponent'
import PrivateRoutes from './components/PrivateRoutes'
import Dashboard from './pages/Dashboard'
import ThemeProvider from './components/ThemeProvider'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPages from './pages/PostPages'
import ScrollToTop from './components/ScrollToTop'
import Search from './pages/Search'

function App() {
  return (
   <BrowserRouter>
     <ScrollToTop/>
   <ThemeProvider>
   <Header></Header>
     <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/project' element={<Project></Project>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/signin' element={<SignIn></SignIn>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/search' element={<Search></Search>}></Route>
        <Route path='/post/:postSlug' element={<PostPages/>}></Route>
        <Route element={<PrivateRoutes/>}>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Route>
        <Route element={<AdminPrivateRoute/>}>
          <Route path='/createpost' element={<CreatePost/>}></Route>
          <Route path='/updatepost/:postId' element={<UpdatePost/>}></Route>
        </Route>
     </Routes>
     <FooterComponent></FooterComponent>
     </ThemeProvider>
   </BrowserRouter>
  )
}

export default App