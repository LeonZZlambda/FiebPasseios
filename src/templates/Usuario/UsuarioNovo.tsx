import React from 'react';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import './Usuario.css';

export default function UsuarioNovo(): JSX.Element {
  return (
    <div className="management-page">
      <Header goto="/usuario" title="Novo Usuário" logo={logo} />
      <div className="container management-shell">
        <section className="management-card">
          <div className="management-card-header">
            <div>
              <h2 className="management-card-title">Cadastrar novo usuário</h2>
              <p className="management-description mb-0">
                Defina nome, e-mail e nível de acesso com clareza antes de liberar a conta.
              </p>
            </div>
          </div>

          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputNome" className="form-label">
                Nome
              </label>
              <input type="text" className="form-control" id="inputNome" placeholder="Nome completo" />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="inputEmail4" placeholder="nome@empresa.com" />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputAcesso" className="form-label">
                Acesso
              </label>
              <select id="inputAcesso" className="form-select" defaultValue="">
                <option value="" disabled>
                  Nível de acesso
                </option>
                <option value="ADMIN">Administrador</option>
                <option value="USER">Usuário</option>
              </select>
            </div>
            <div className="col-12 d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Gravar
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
