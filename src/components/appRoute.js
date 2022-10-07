import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/authContext";
import AddMovie from "../pages/addMovie";
import AddUser from "../pages/addUser";
import FilmPage from "../pages/filmPage";
import Home from "../pages/home";
import MyMovieList from "../pages/myMovieList";
import SignIn from "../pages/signIn";

function AppRoute() {

    const { isAuth } = useAuth();

    let userType = localStorage.getItem('userType')

    return (<>

        {
            (isAuth === 'true') && <Routes>
                <Route path="/filmPage" element={<FilmPage />} />
                <Route path="/myMoviList" element={<MyMovieList />} />
                {
                    (userType === 'admin') && 
                    <Route path="/addMovie" element={<AddMovie />} />
                }
                {
                    (userType === 'admin') && 
                    <Route path="/addMovie/:id" element={<AddMovie />} />
                }
                <Route path="*" element={<Navigate to="/filmPage" />} />
            </Routes>

        }

        {
            (isAuth === 'false') && <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/addUser" element={<AddUser />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        }
    </>);
}

export default AppRoute;