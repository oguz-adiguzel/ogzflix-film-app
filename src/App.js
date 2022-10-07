import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/signIn';
import FilmPage from './pages/filmPage';
import MyMovieList from './pages/myMovieList';
import { AuthProvider } from './context/authContext';
import AppRoute from './components/appRoute';
import { AlertProvider } from './context/deleteMyListAlert';





function App() {
  return (
    <>
      <AuthProvider>
        <AlertProvider>
          <AppRoute />
        </AlertProvider>
      </AuthProvider>

      {/* <Routes>
        <Route path='/' element={<Home />} /> X
        <Route path='/signin' element={<SignIn />} />
        <Route path='/filmPage' element={<FilmPage />} /> X
        <Route path='/myMoviList' element={<MyMovieList />} /> X
      </Routes> */}
    </>
  );
}

export default App;
