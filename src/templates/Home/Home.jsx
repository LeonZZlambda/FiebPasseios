import { Link } from "react-router-dom"
import Sidebar from '../../components/Menu/Sidebar'

const Home = () => {

    return (
        <div className="d-flex">
           <Sidebar />
           <div className="p-3 w-100">
                <nav className="fieb-logo">
                    <h1>Hora de passear!</h1>
                    <h3>Passeios Disponíveis:</h3>

                    {/* slide de imagens com link*/}
                    <br />

                    <h1>Em breve...</h1>
                    <h3>Futuros Passeios:</h3>

                    {/* slide de imagens com link*/}
                    <br />

                    <h1>Para avaliar</h1>
                    <h3>Avalie seus passeios anteriores:</h3>

                    {/* slide de imagens com link */}
                    <br />
                </nav>
           </div>
        </div>
    )
}

export default Home