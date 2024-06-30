// home route
import Home from './pages/Home'

// user profile route
import Profile from './pages/User/Profile'

// admin routes
import AdminMoviesList from './pages/Admin/AdminMoviesList'
import UpdateMovie from './pages/Admin/UpdateMovie'
import CreateMovie from './pages/Admin/CreateMovie'
import AllComments from './pages/Admin/AllComments'
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard'
import AdminRoute from './pages/Admin/AdminRoute'
import GenreList from './pages/Admin/GenreList'

// movies routes
import AllMovies from './pages/Movies/AllMovies'
import MovieDetails from './pages/Movies/MovieDetails'

// auth routes
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import PrivateRoute from './pages/Auth/PrivateRoute'
import Navigation from './pages/Auth/Navigation'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className='py-3'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<AllMovies />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/movies/:id' element={<MovieDetails />} />

            <Route path='' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>

            <Route path='' element={<AdminRoute />}>
              <Route path='/admin/movies/genre' element={<GenreList />} />
              <Route path='/admin/movies/create' element={<CreateMovie />} />
              <Route path='/admin/movies-list' element={<AdminMoviesList />} />
              <Route path='/admin/movies/update/:id' element={<UpdateMovie />} />
              <Route path='/admin/movies/dashboard' element={<AdminDashboard />} />
              <Route path='/admin/movies/comments' element={<AllComments />} />
            </Route>
          </Routes>
        </Router>
      </main>
    </>
  )
}

export default App