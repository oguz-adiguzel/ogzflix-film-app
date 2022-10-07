import Footer from "../components/footer";
import Header from "../components/header";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { UserListServices } from "../services/userListServices";
import { useNavigate } from "react-router-dom";


function AddUser() {

    useEffect(() => {
        getUserList();
    }, []);

    const [form, setForm] = useState({});
    const [userList, setUserList] = useState([]);

    const navigate = useNavigate();

    const userListServices = new UserListServices();

    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            setForm(values);
            console.log(values);
            addUser();
        }
    })

    const addUser = () => {

        let newUser = userList.find(item => (
            item.email === values.email
        ))

        if (!newUser) {
            let model = {
                id: null,
                email: values.email,
                password: values.password,
                userType: "user"
            }
            userListServices.addUser(model).then((res) => {
                alert('Kayıt Başarılı Giriş Yapabilirsiniz');
                navigate('/');
            })
        }else{
            alert('Email Kayıtlı');
        }
    }

    const getUserList = () => {
        userListServices.getUserList().then((res) => {
            setUserList(res);
        })
    }

    return (<>
        <div className="container-fluid home py-3">
            <Header />
            <div className="row d-flex justify-content-center h-100 align-items-center">
                <div className="col-4 bg-dark py-5 px-5">
                    <div className="w-100 d-flex justify-content-center">
                        <span className="text-light fs-3 bg-warning p-2 rounded-3 fw-bold logo">OGZ<span className="bg-danger px-1 rounded">FLIX</span></span>
                    </div>
                    <h3 className="text-light text-center my-3">Yeni Kullanıcı Oluştur</h3>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label text-light">Email</label>
                            <input type="email" name="email" value={values.email} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label text-light">Parola</label>
                            <input type="password" name="password" value={values.password} onChange={handleChange} class="form-control" id="exampleInputPassword1" />
                        </div>
                        <button className="sigin-submit-button mt-4" type="submit">Kişi Oluştur</button>
                    </form>
                </div>
            </div>
        </div>
        <Footer />
    </>);
}

export default AddUser;