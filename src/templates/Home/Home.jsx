import { Link } from "react-router-dom"
import Sidebar from '../../components/Menu/Sidebar'

import './Home.css';

import chevron from '../../assets/images/chevron.png'
import { useEffect, useState, useRef } from "react";

function Home() {
    const [data, setData] = useState([]);
    const carousel = useRef(null);

    useEffect(() => {
    fetch('../../../../../public/static/passeios.json')
    .then((response)=>response.json())
    .then(setData);
    }, []);


    const handleLeftClick = (e) =>{
        e.preventDefault();
        carousel.current.scrollRight -= carousel.current.offSetWidth;
    }

    const handleRightClick = (e) =>{
        e.preventDefault();
        carousel.current.srollLeft += carousel.current.offSetWidth;
    }

    return (
        <div className="d-flex">
           <Sidebar />
           <div className="p-3 w-100">
                <nav className="fieb-logo">
                    <h1 className="title-bold">Passeios Disponíveis</h1>
                    <h3>Passeios que estão em andamento:</h3>
                        <div className="carousel" ref={carousel}>


                            {data.map((item) => {
                                const {id, name, quant, price, unitd, local, image} = item;
                            return (
                                <div className="item" key={id}>
                                <div className="image">
                                    <img src={image} alt={name} />
                                </div>
                                <div className="info">
                                    <span className="name">{name}</span>
                                    <span className="quant">quant. de alunos: {quant}</span>
                                    <span className="unitd">{unitd}</span>
                                    <span className="locate">{local}</span>
                                    <span className="price">preço: {price}</span>
                                    <span className="view"><a href="/editar">Editar</a></span>
                                </div>
                            </div>
                              );
                            })}
                        </div>
                            <div className="buttons">
                                <button onClick={handleLeftClick}><img src={chevron} alt="scroll left" /></button>
                                <button onClick={handleRightClick}><img src={chevron} alt="scroll right"/></button>
                            </div>
                    <br />

                    <h1 className="title-bold">Futuros Passeios</h1>
                    <h3>Opções que serão abertas em breve:</h3>

                    

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