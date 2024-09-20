import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'

const MensagemLer = () => {

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/mensagem'}
                    title={'Ler Mensagem'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <form className="mx-5 p-2 border">
                        <div className="row my-3 g-1">
                            <label htmlFor="inputID" className="col-md-1 col-form-label">ID:</label>
                            <div class="col-md-2">
                                <input type="text" className="form-control" id="inputID" readOnly />
                            </div>

                            <label htmlFor="inputData" className="col-md-2 col-form-label">Data:</label>
                            <div class="col-md-3">
                                <input type="text" className="form-control" id="inputData" readOnly />
                            </div>

                            <label htmlFor="inputStatus" className="col-md-2 col-form-label">Status:</label>
                            <div class="col-md-2">
                                <input type="text" className="form-control" id="inputStatus" readOnly />
                            </div>
                        </div>
                        <div className="row mb-1">
                            <label htmlFor="inputEmissor" className="col-md-2 col-form-label">Emissor:</label>
                            <div class="col-md-10">
                                <input type="text" className="form-control" id="inputEmissor" readOnly />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputEmail" className="col-md-2 col-form-label">Email:</label>
                            <div class="col-md-10">
                                <input type="email" className="form-control" id="inputEmail" readOnly />
                            </div>
                        </div>

                        <div className="col-md-12 mb-2">
                            <label htmlFor="inputTexto" className="form-label">Mensagem:</label>
                            <textarea rows={5} className="form-control" id="inputTexto" >
                                </textarea>
                        </div>
                        

                        <div className="col-12 d-flex justify-content-around">
                            <button type="submit" className="btn btn-warning">
                                Marcar com Lida
                            </button>
                            <button type="submit" className="btn btn-danger">
                                Inativar
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default MensagemLer