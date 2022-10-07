import { useEffect, useState } from "react";
import { UserListServices } from "../services/userListServices";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Footer from "../components/footer";
import Header from "../components/header";

function SignIn() {

    useEffect(() => {
        getUser()
        localStorage.clear();
        setPopupOpen(false);
    }, []);


    const [popupOpen, setPopupOpen] = useState(false)
    const service = new UserListServices();
    const [userList, setUserList] = useState([]);
    const [form,  setForm] = useState([]);
    const navigate = useNavigate();

    const { setIsAuth } = useAuth();

    const [userAlert, setUserAlert] = useState(false)

    const getUser = () => {
        service.getUserList().then((res) => {
            setUserList(res);
        })
    }

    const signİn = () => {
        let newUser = userList.find(item => (
            item.email === values.email && item.password === values.password
        ))

        if (newUser) {
            setPopupOpen(true);

            setTimeout(() => {
                localStorage.setItem('userType', newUser.userType);
                setIsAuth('true');
                navigate('/filmPage');
            }, 1500);

        } else {
            setUserAlert(true);
            setTimeout(() => {
                setUserAlert(false);
            }, 1500);
        }

    }

    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            setForm(values);
        }
    })


    return (<>
        {
            popupOpen === true &&
            <div className="container-fluid popup d-flex justify-content-center align-items-center">
                <div className="w-25 bg-light d-flex flex-column align-items-center py-5">
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    <p className="fw-bold mt-3 fs-5">Giriş Yapılıyor</p>
                </div>
            </div>
        }

        <div className="container-fluid home py-3">
            <Header />
            {
                userAlert === true &&
                <div className="row justify-content-end">
                    <div className="col-3">
                        <div class="alert alert-danger" role="alert">
                            Kullanıcı adı veya şifre hatalı
                        </div>
                    </div>
                </div>
            }
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-3 py-5 px-5 signin-container">
                    <div className="container d-flex justify-content-center">
                        <span className="text-light fs-3 bg-warning p-2 rounded-3 fw-bold logo">OGZ<span className="bg-danger px-1 rounded">FLIX</span></span>
                    </div>
                    <h4 className="text-light fs-3 fw-bold mt-3">Oturum Aç</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input name="email" value={values.email} onChange={handleChange} type="text" className="form-control bg-dark text-light py-2 mt-4" id="exampleInputPassword1" placeholder="E-posta veya telefon numarası" />
                        </div>
                        <div className="mb-3">
                            <input name="password" value={values.password} onChange={handleChange} type="password" className="form-control bg-dark text-light py-2 mt-4" id="exampleInputPassword1" placeholder="Parola" />
                        </div>
                        <div className="mb-3">
                            <button onClick={signİn} className="sigin-submit-button mt-4" type="submit">Oturum Aç</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer />
    </>);
}

export default SignIn;