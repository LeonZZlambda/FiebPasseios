import { Link } from "react-router-dom"
import Sidebar from '../../components/Menu/Sidebar'

import './Home.css';

const Home = () => {

    return (
        <div className="d-flex">
           <Sidebar />
           <div className="p-3 w-100">
                <nav className="fieb-logo">
                    <h1 className="title-bold">Passeios Disponíveis</h1>
                    <h3>Passeios que estão em andamento:</h3>

                    {/* slide de imagens com link*/}
                    <br />

                    <h1 className="title-bold">Futuros Passeios</h1>
                    <h3>Opções que serão abertas em breve:</h3>

                    {/* slide de imagens com link*/}
                    <br />

                    <h1 className="title-bold">Ver Avaliações</h1>
                    <h3>Avaliações Recentes:</h3>

                    {/* slide de imagens com link */}
                    <br />
                </nav>
           </div>
        </div>
    )
}

export default Home