import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilmCard from "../components/flmCard";
import Footer from "../components/footer";
import { useAuth } from "../context/authContext";
import { MovieServices } from "../services/movieListService";

function FilmPage() {

    useEffect(() => {
        getMovieList();
    }, []);

    const movieService = new MovieServices();
    const [movieList, setMovieList] = useState([]);
    const navigate = useNavigate();
    const { setIsAuth } = useAuth();

    const getMovieList = () => {
        movieService.getMovies().then((res) => {
            setMovieList(res)
        })
    }

    const exit = () => {
        localStorage.clear();
        setIsAuth('false');
        navigate('/');
    }

    let userType = localStorage.getItem("userType");

    return (<>
        <div className="container-fluid film-page-container py-3">
            <div className="row">
                <div className="col-6 py-3 px-5">
                    <span className="text-light fs-3 bg-warning p-2 rounded-3 fw-bold logo">OGZ<span className="bg-danger px-1 rounded">FLIX</span></span>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center">
                    {
                        userType === 'user' &&
                        <button onClick={() => navigate('/myMoviList')} type="button" className="btn btn-warning me-1">Film Listem</button>
                    }
                    {
                        userType === 'admin' &&
                        <button onClick={()=>navigate('/addMovie')} type="button" className="btn btn-primary me-1">Film Ekle</button>
                    }
                    <button onClick={exit} type="button" className="btn btn-danger">Çıkış</button>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <h1 className="text-light text-center">Genel Film Listesi</h1>
                </div>
                <div className="row justify-content-evenly ">
                    {
                        movieList.map((item, index) => (
                            <FilmCard key={index} item={item} />
                        ))
                    }

                </div>
            </div>
        </div>
        <Footer />            
    </>);
}

export default FilmPage;