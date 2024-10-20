import './ProjectForm.css';

const ProjectForm = () => {

    return (
        <div className="form-container">
            <form className="project-form">
                <h4 className="text">Nome: 
                    <input type="text" placeholder="Insira o nome do passeio" required />
                </h4>
                <h4 className="text">Quant. de alunos: 
                    <input type="number" placeholder="Insira o número máx de alunos" required />
                </h4>
                <h4 className="text">Unidade: 
                    <select name="unitd" required>
                        <option disabled selected>Selecione qual Unidade está envolvida</option>
                        <option>ITB Brasílio Flores - Jd. Belval</option>
                        <option>ITB Maria Theoroda - </option>
                        <option>ITB Maria Challupe - Eng. Novo</option>
                        <option>ITB Moacyr Domingos - Pq. Imperial</option>
                        <option>ITB Antonio Arantes - Pq. Viana</option>
                        <option>ITB Hércules Alves - Jd. Mutinga</option>
                        <option>Toda a FIEB</option>
                    </select>
                </h4>
                <h4 className="text">Local: 
                    <input type="text" placeholder="Insira o local do passeio:" required />
                </h4>
                <h4 className="text">Valor: R$ 
                    <input type="number" placeholder="Insira o valor total do passeio (ingresso + transporte):" required />
                </h4>
                <h4 className="text">Imagem do passeio: 
                    <input type="file" accept="image/*" required />
                </h4>
                <div className="submit-container b">
                    <input type="submit" value="Criar passeio" />
                </div>
            </form>
        </div>
    );
}

export default ProjectForm;
