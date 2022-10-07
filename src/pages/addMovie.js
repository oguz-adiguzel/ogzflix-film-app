import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MovieServices } from "../services/movieListService";
import { MyMovieListService } from "../services/myMovieListService";
import validation from "../validations";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/footer";

function AddMovie() {
    const movieListService = new MovieServices();
    const myMovieListService = new MyMovieListService();
    const navigate = useNavigate();

    const [form, setForm] = useState({});

    const { id } = useParams();

    const [getByIdMovie, setGetByIdMovie] = useState({})


    const getMovieById = (movieId) => {
        movieListService.getByIdMovies(movieId).then((res) => {
            setGetByIdMovie(res);
        })
    }

    useEffect(() => {
        if (id) getMovieById(id)
    }, [id]);

    const addMovie = (form) => {
        let model = {
            id: null,
            name: form.name,
            director: form.director,
            point: form.point,
            posterUrl: form.posterUrl,
            title: form.title,
            iframe: form.iframe
        }
        toast.success('Film Eklendi', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        movieListService.addMovies(model).then(() => {
            setTimeout(() => {
                navigate('/filmPage');
            }, 1500);
        })
    }

    const updateMovie = (id) => {
        let model = {
            id: values.id ? values.id : getByIdMovie.id,
            name: values.name ? values.name : getByIdMovie.name,
            director: values.director ? values.director : getByIdMovie.director,
            point: values.point ? values.point : getByIdMovie.point,
            posterUrl: values.posterUrl ? values.posterUrl : getByIdMovie.posterUrl,
            title: values.title ? values.title : getByIdMovie.title,
            iframe: values.iframe ? values.iframe : getByIdMovie.iframe
        }
        movieListService.updateMovie(id, model).then((res) => {
            console.log(res);
        })
        toast.warning('Film Güncellendi', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        setTimeout(() => {
            myMovieListService.updateMovie(id, model).res((res) => {
                console.log(res);
            })
        }, 1000);

        setTimeout(() => {
            navigate('/filmPage');
        }, 1500);
    }

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
        initialValues: {
            name: '',
            director: '',
            point: '',
            posterUrl: '',
            title: '',
            iframe: ''
        },
        onSubmit: (values) => {
            console.log(values);
            setForm(values)
            if (!id) {
                addMovie(form);
            }
        },
        validationSchema: validation
    })


    return (<>
        <ToastContainer />
        <div className="container-fluid add-movie-container py-3">
            <div className="row">
                <div className="col-6 py-3 px-5">
                    <span onClick={() => navigate('/filmPage')} className="text-light fs-3 bg-warning p-2 rounded-3 fw-bold logo">OGZ<span className="bg-danger px-1 rounded">FLIX</span></span>
                </div>
            </div>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="row d-flex justify-content-center mt-5">
                        <div className="col-md-5">
                            <label htmlFor="name" className="form-label text-danger fs-4">Film İsmi</label>
                            <input name="name" value={values.name || getByIdMovie.name} onChange={handleChange} type="text" className="form-control" id="name" onBlur={handleBlur} />
                            {
                                !id && touched.name && errors.name && <div class="alert alert-danger mt-1" role="alert">
                                    {errors.name}
                                </div>
                            }
                        </div>

                        <div className="col-md-5">
                            <label htmlFor="director" className="form-label text-danger fs-4">Yönetmen</label>
                            <input name="director" value={values.director || getByIdMovie.director} onChange={handleChange} type="text" className="form-control" id="director" onBlur={handleBlur} />
                            {
                                !id && touched.director && errors.director && <div class="alert alert-danger mt-1" role="alert">
                                    {errors.director}
                                </div>
                            }
                        </div>

                        <div className="col-md-5 mt-5">
                            <label htmlFor="point" className="form-label text-danger fs-4">Puan</label>
                            <input name="point" value={values.point || getByIdMovie.point} onChange={handleChange} type="text" className="form-control" id="point" onBlur={handleBlur} />
                            {
                                !id && touched.point && errors.point && <div class="alert alert-danger mt-1" role="alert">
                                    {errors.point}
                                </div>
                            }
                        </div>

                        <div className="col-md-5 mt-5">
                            <label htmlFor="posterUrl" className="form-label text-danger fs-4">Poster Url</label>
                            <input name="posterUrl" value={values.posterUrl || getByIdMovie.posterUrl} onChange={handleChange} type="text" className="form-control" id="posterUrl" onBlur={handleBlur} />
                            {
                                !id && touched.posterUrl && errors.posterUrl && <div class="alert alert-danger mt-1" role="alert">
                                    {errors.posterUrl}
                                </div>
                            }
                        </div>
                        <div className="col-md-5 mt-5">
                            <label htmlFor="iframe" className="form-label text-danger fs-4">İframe</label>
                            <input name="iframe" value={values.iframe || getByIdMovie.iframe} onChange={handleChange} type="text" className="form-control" id="iframe" onBlur={handleBlur} />
                            {
                                !id && touched.iframe && errors.iframe && <div class="alert alert-danger mt-1" role="alert">
                                    {errors.iframe}
                                </div>
                            }
                        </div>


                        <div className="col-md-5 mt-5">
                            <div className="form-floating mt-4">
                                <textarea value={values.title || getByIdMovie.title} onChange={handleChange} name="title" className="form-control" id="title" onBlur={handleBlur}></textarea>
                                <label className="text-danger" htmlFor="title">Açıklama</label>
                            </div>
                            {
                                !id && touched.title && errors.title && <div class="alert alert-danger mt-1" role="alert">
                                    {errors.title}
                                </div>
                            }
                        </div>

                        <div className="col-md-10 mt-5">
                            {
                                !id &&
                                <button type="submit" className="btn btn-warning px-4 text-danger">Film Ekle</button>
                            }
                            {
                                id &&
                                <button onClick={() => updateMovie(id)} type="submit" className="btn btn-success px-4 text-light">Güncelle</button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
    </>);
}

export default AddMovie;