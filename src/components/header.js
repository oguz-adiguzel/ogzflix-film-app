import { useNavigate } from "react-router-dom";


function Header() {

    const navigate = useNavigate();

    const logIn = () => {
        navigate('/signin');
    }

    const addUser = () => {
        navigate('/addUser')
    }

    return (<>
        <nav className="navbar navbar-expand-lg navbar-light px-5">
            <div className="container-fluid">
                {/* <img className="logo" src="https://themehut.co/wp/movflx/wp-content/themes/movflx/assets/img/logo/logo.png" /> */}

                <span className="text-light fs-3 bg-warning p-2 rounded-3 fw-bold logo">OGZ<span className="bg-danger px-1 rounded">FLIX</span></span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
                        <li className="nav-item">
                            <a className="nav-link active text-light ms-5 fw-bold navbar-link" aria-current="page" href="#">HOME</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light ms-5 fw-bold navbar-link" href="#">MOVİE</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light ms-5 fw-bold navbar-link" href="#">TV SHOW</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light ms-5 fw-bold navbar-link" href="#">PRICING</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light ms-5 fw-bold navbar-link" href="#">BLOG</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light ms-5 fw-bold navbar-link" href="#">CONTACT</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <button onClick={addUser} className="signin-button me-1">SIGNIN</button>
                        <button onClick={logIn} className="signin-button">LOGIN</button>
                    </form>
                </div>
            </div>
        </nav>
    </>);
}

export default Header;