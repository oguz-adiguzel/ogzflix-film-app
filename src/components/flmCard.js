import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/deleteMyListAlert";
import { MovieServices } from "../services/movieListService";
import { MyMovieListService } from "../services/myMovieListService";

function FilmCard({ item }) {

    useEffect(() => {
        getMyMovieList();
        getMovieList();
    }, []);

    const [alertAddMovie, setAlertAddMovie] = useState(false);
    const [alertDanger, setAlertDanger] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false)

    const { alertt, setAlert } = useAlert();


    const [movieList, setMovieList] = useState([]);
    const [popupIframe, setPopupIframe] = useState({});
    const [popupOpen, setPopupOpen] = useState(false);
    const [myMovieList, setMyMovieList] = useState([]);
    const myMovieService = new MyMovieListService();
    const navigate = useNavigate();
    const movieListService = new MovieServices();
    const getMyMovieList = () => {
        myMovieService.getMyMovieList().then((res) => {
            setMyMovieList(...myMovieList, res);
        })
    }

    const getMovieList = () => {
        movieListService.getMovies().then((res) => {
            setMovieList(res);
        })
    }

    const addMyMovieList = (id) => {

        let newarr = myMovieList.find(item => item.id === id);

        if (!newarr) {
            let model = {
                id: item.id,
                name: item.name,
                director: item.director,
                point: item.point,
                posterUrl: item.posterUrl,
                title: item.title
            }

            console.log(model);
            myMovieService.addMyList(model).then((res) => {
                setAlertAddMovie(true)
                setTimeout(() => {
                    navigate('/myMoviList')
                    setAlertAddMovie(false)
                    navigate('/myMoviList')
                }, 2000);
            })
        } else {
            setAlertDanger(true);
            setTimeout(() => {
                setAlertDanger(false)
            }, 2000);
        }
    }

    const deleteMyList = (id) => {
        let newMyMovie = myMovieList.find(item => item.id === id);

        if (newMyMovie) {
            myMovieService.deleteMovies(id).then((res) => {
                userType === 'user' && setAlert(true);
                window.scrollTo(0, 0)
                setTimeout(() => {
                    userType === 'user' && setAlert(false)
                    window.location.reload();
                }, 2000);
            })
        }
        else {
            userType === 'user' && alert('Film Listenizde Değil')
        }
    }

    const deleteMovie = (id) => {
        movieListService.deleteMovies(id).then((res) => {
            setDeleteAlert(true)
            deleteMyList(id);
            setTimeout(() => {
                window.location.reload();
                setDeleteAlert(false)
            }, 2000);
        })
    }

    const updateMovie = (id) => {
        navigate('/addMovie/' + id);
    }

    const openPopup = (id) => {
        let catchIframe = movieList.find(item => (
            item.id === id
        ))
        setPopupIframe(catchIframe);
        setPopupOpen(true)
    }

    let userType = localStorage.getItem("userType");

    return (<>

        <div className="col-md-3 mx-1 mt-4 film-card d-flex justify-content-center">
            {
                popupOpen === true &&
                <div className="container-fluid popup-fragman d-flex flex-column justify-content-center">
                    <div className="w-100 bg-dark ">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-end">
                                <button onClick={() => setPopupOpen(false)} type="button" className="btn btn-sm btn-danger m-2">X</button>
                            </div>
                        </div>
                        <div className="row pb-5">
                            <iframe width="560" height="315" src={popupIframe.iframe} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            }
            <div className="card film-cardd">
                {
                    alertAddMovie === true &&
                    <div class="alert alert-primary alert-animation" role="alert">
                        Film Listenize Eklendi
                    </div>
                }
                {
                    alertDanger === true &&
                    <div class="alert alert-danger alert-animation" role="alert">
                        Film Listenizde Bulunuyor
                    </div>
                }

                {
                    deleteAlert === true &&
                    <div class="alert alert-danger alert-animation" role="alert">
                        Film Silindi
                    </div>
                }

                <img src={item.posterUrl} className="card-img-top w-50 mx-auto" alt="..." />
                <div className="card-body">
                    <h5 className="card-title fs-3 text-warning text-capitalize">{item.name}</h5>
                    <p className="card-text text-light">{item.title}</p>
                    <div className="row">
                        <div className="col-6 d-flex flex-column align-items-center">
                            <span className="card-text text-warning">Yönetmen</span><p className="card-text text-danger text-capitalize">{item.director}</p>
                        </div>
                        <div className="col-6 d-flex flex-column align-items-center">
                            <span className="card-text text-warning">Puan</span><p className="card-text text-danger">{item.point}</p>
                        </div>
                    </div>

                </div>

                <div className="card-body d-flex justify-content-center align-items-center">
                    {
                        userType === 'user' &&
                        <button onClick={() => addMyMovieList(item.id)} className="bg-success text-light rounded">Listeme Ekle</button>
                    }
                    {
                        userType === 'user' &&
                        <button onClick={() => deleteMyList(item.id)} className="bg-danger text-light rounded">Listemden Sil</button>
                    }
                    {
                        userType === 'admin' &&
                        <button onClick={() => deleteMovie(item.id)} className="bg-danger text-light rounded">Filmi Kaldır</button>
                    }
                    {
                        userType === 'admin' &&
                        <button onClick={() => updateMovie(item.id)} className="bg-warning text-light rounded">Filmi Güncelle</button>
                    }
                    <button onClick={() => openPopup(item.id)} className="bg-success text-light rounded">Fragman izle</button>
                </div>
            </div>

        </div>
    </>);
}

export default FilmCard;