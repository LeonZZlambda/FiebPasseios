import Sidebar from '../../components/Menu/Sidebar';
import ProjectForm from '../../components/Project/ProjectForm';

const CriarPasseio = () => {

    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='p-3 w-100'>
                <nav className='fieb-logo'>
                    
                <h1 className="title-bold">Vamos Viajar?</h1>
                    <h3>Crie o próximo passeio da FIEB:</h3>
                    <div>
                        <br />
                        <ProjectForm />
                    </div>
                    <br />
                    
                    <h1 className="title-bold">Ver Avaliações</h1>
                    <h3>Avaliações Recentes:</h3>

                    <br />
                </nav>
            </div>
        </div>
    );

}

export default CriarPasseio;