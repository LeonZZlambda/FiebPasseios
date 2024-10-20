import { Link } from "react-router-dom";
import Sidebar from '../../components/Menu/Sidebar';

import ProjectForm from '../../components/Project/ProjectForm';

import './Home.css';

import chevron from '../../assets/images/chevron.png';
import { useEffect, useState, useRef } from "react";

function Home() {
    const [data, setData] = useState([]);
    const carousel = useRef(null);

    useEffect(() => {
        fetch('/static/passeios.json')
            .then((response) => response.json())
            .then(setData);
    }, []);

    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth; 
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth; 
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <nav className="fieb-logo-menu">
                    <h1 className="title-bold">Passeios Disponíveis</h1>
                    <h3>Passeios que estão em andamento e podem ser editados:</h3>
                    <div className="carousel" ref={carousel}>
                        {data.map((item) => {
                            const { id, name, quant, price, unitd, local, data, image } = item;
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
                                        <span className="data">data: {data}</span>
                                        <span className="price">preço: R${price}</span>
                                        <span className="view"><Link to='/editar'>Editar</Link></span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="buttons">
                        <button onClick={handleLeftClick}><img src={chevron} alt="scroll left" /></button>
                        <button onClick={handleRightClick}><img src={chevron} alt="scroll right" /></button>
                    </div>
                    <br /> <br />

                    
                </nav>
            </div>
        </div>
    );
}

export default Home;
