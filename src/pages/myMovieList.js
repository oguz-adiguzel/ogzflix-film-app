import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilmCard from "../components/flmCard";
import Footer from "../components/footer";
import { useAlert } from "../context/deleteMyListAlert";
import { MyMovieListService } from "../services/myMovieListService";

function MyMovieList() {

    useEffect(() => {
        getMyMovie();
    }, []);

    const { alertt } = useAlert();

    const myMovieListService = new MyMovieListService();
    const [myMovieList, setMyMovieList] = useState([]);
    const navigate = useNavigate();

    const getMyMovie = () => {
        myMovieListService.getMyMovieList().then((res) => {
            setMyMovieList(res);
        })
    }

    let userType = localStorage.getItem("userType");

    return (<>
        <div className="container-fluid film-page-container py-3">
            <div className="row">
                <div className="col-6 py-3 px-5">
                    <span onClick={() => navigate('/filmPage')} className="text-light fs-3 bg-warning p-2 rounded-3 fw-bold logo">OGZ<span className="bg-danger px-1 rounded">FLIX</span></span>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center">
                    {
                        userType === 'user' &&
                        <button onClick={() => navigate('/filmPage')} type="button" class="btn btn-success">Film Listesi</button>
                    }
                </div>
            </div>
            <div className="container-fluid">
                {
                    alertt === true &&
                    <div class="alert alert-danger w-25" role="alert">
                        Film Listenizden Kaldırıldı
                    </div>
                }
                <div className="row">
                    <h1 className="text-light text-center">Film Listem</h1>
                </div>
                <div className="row justify-content-evenly">
                    {
                        myMovieList.map((item, index) => (
                            <FilmCard key={index} item={item} />
                        ))
                    }

                </div>
            </div>
        </div>
        <Footer />
    </>);
}

export default MyMovieList;