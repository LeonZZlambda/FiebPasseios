import { Link } from "react-router-dom";
import './Sidebar.css';
import profile from '../../assets/images/social/profile.svg';

const Sidebar = () => {

    return (
        <div className="sidebar">
            <div className="d-flex justify-content-around align-items-center px-2 py-4 border-bottom rounded">
                <img src={profile} alt="profile" className="profile" />
                <span className="fw-bold fst-italic">Seja Bem vindo(a), Sílvia</span>
            </div>

            <nav className="nav flex-column">
                <Link className="nav-link" aria-current="page" to={'/home'}>Dashboard</Link>
                <Link className="nav-link" to={'/mensagem'}>Avaliações</Link>
                <Link className="nav-link" to={'/usuario'}>Passeios</Link>
                <Link className="nav-link" to={'/usuario'}>Minha Conta</Link>
            </nav>
        </div>
    )
}

export default Sidebar