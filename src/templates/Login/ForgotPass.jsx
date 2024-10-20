import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/fiebl.png';
import './Login.css';

const ForgotPass = () => {

    const navigate = useNavigate();

    const goto = () => {
        navigate("/");
    }

    const backto = () => {
        navigate("/");
    }

    return (
        <div className="container">
            <form action="" className="login-form">
                <div className="login-logo">
                    <img src={logo} alt="logo" className="fieb-login"/>
                </div>
                <h4 className="text-center ">Recuperação de Senha</h4>
                <div className="my-3">
                    <label htmlFor="email" className="form-label mb-0 fw-bold">Email:</label>
                    <input type="email" id="email" className="form-control text-center fw-medium shadow" required />
                </div>
                <div className="d-flex flex-row-reverse mt-1">
                    <p className="fw-bold fst-italic opacity-75 me-1">Lembrou da senha?
                        <Link to={'/login'}> Clique aqui.</Link>
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
                        onClick={goto} >Solicitar Nova Senha</button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPass;
