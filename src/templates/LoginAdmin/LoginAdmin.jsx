import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import './LoginAdmin.css';

const Login = () => {

    const navigate = useNavigate();

    const goto = () => {
        navigate("/homeAdmin");
    }

    const backto = () => {
        navigate("/");
    }


    return (
        <div className="container">
            <form action="" className="login-form">
                <div className="login-logo">
                    <img src={logo} alt="logo" className="logo-admin"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label mb-0 fw-bold">Email:</label>
                    <input type="email" id="email" className="form-control text-center fw-medium shadow" />
                </div>
                <div>
                    <label htmlFor="password" className="form-label mb-0 fw-bold">Senha:</label>
                    <input type="password" id="password" className="form-control text-center fw-medium shadow" />
                </div>
                <div className="d-flex flex-row-reverse mt-1">
                    <p className="fw-bold fst-italic opacity-75 me-1">Esqueceu a senha?
                        <Link to={'/forgotpass'}> Clique aqui.</Link>
                    </p>
                </div>
                <div className="d-flex justify-content-center my-1 d-none" id="infos">
                    <p className="fw-bold fst-italic text-danger">
                        Dados Incorretos!!!
                    </p>
                </div>
                <div className="d-flex justify-content-around mb-3 mt-2">
                    <button className="btn btn-danger fw-medium shadow" type="button"
                        onClick={backto}>Cancelar</button>
                    <button className="btn btn-success fw-medium shadow" type="submit"
                        onClick={goto} >Entrar</button>
                </div>
            </form>
        </div>
    )
}

export default Login