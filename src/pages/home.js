import Header from "../components/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

function Home() {

    useEffect(() => {
        localStorage.clear();
        setIsAuth('false');
    }, []);

    const { setIsAuth } = useAuth();
    const [popupOpen, setPopupOpen] = useState(false);

    return (<>
        {
            popupOpen === true &&
            <div className="container-fluid popup d-flex flex-column justify-content-center align-items-center">
                <div className="w-50 bg-dark ">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button onClick={() => setPopupOpen(false)} type="button" class="btn btn-sm btn-danger m-2">X</button>
                        </div>
                    </div>
                    <div className="row pb-5">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/X0tOpBuYasI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        }

        <div className="container-fluid home py-3">
            <Header />
            <div className="container mt-5 py-5">
                <h4 className="text-warning fw-bold mt-5">OGZFLIX</h4>
                <h1 className="text-light display-4 fw-bold">Unlimited <span className="text-warning">Movie</span>, TVs </h1>
                <h1 className="text-light display-4 fw-bold">Shows, & More.</h1>
                <span className="text-light">Action, Comedy</span>
                <span className="text-light ms-3"><FontAwesomeIcon icon={faCalendarDays} className="text-warning" /> 2021</span>
                <span className="text-light ms-3"><FontAwesomeIcon icon={faClock} className="text-warning" /> 120 min</span>
                <br />
                <button onClick={() => setPopupOpen(true)} className="home-button mt-4"><FontAwesomeIcon icon={faPlay} className="text-light me-1 play-icon" /> WATCH NOW</button>
            </div>
        </div>
        <Footer />
    </>);
}

export default Home;