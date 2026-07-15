import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import UsuarioService from '../../services/UsuarioService';
import './Usuario.css';

type Usuario = {
  id?: string | number;
  nome?: string;
  email?: string;
  dataCadastro?: string;
  statusUsuario?: string;
  nivelAcesso?: string;
};

export default function UsuarioEditar(): JSX.Element {
  const { id } = useParams() as { id?: string };
  const [usuario, setUsuario] = useState<Usuario>({});

  useEffect(() => {
    if (!id) return;
    UsuarioService.getById(id)
      .then((response) => setUsuario(response.data ?? {}))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="management-page">
      <Header goto="/usuario" title="Editar Usuário" logo={logo} />
      <div className="container management-shell">
        <section className="management-card">
          <div className="management-card-header">
            <div>
              <h2 className="management-card-title">Editar conta</h2>
              <p className="management-description mb-0">
                Atualize os dados e mantenha o controle de acesso organizado.
              </p>
            </div>
            <span className={`status-pill status-${(usuario.statusUsuario || 'ATIVO').toLowerCase()}`}>
              {usuario.statusUsuario || 'ATIVO'}
            </span>
          </div>

          <form className="row g-3">
            <div className="col-md-2">
              <label htmlFor="inputID" className="form-label">
                ID
              </label>
              <input type="text" className="form-control" id="inputID" readOnly value={usuario.id ?? ''} />
            </div>
            <div className="col-md-5">
              <label htmlFor="inputNome" className="form-label">
                Nome
              </label>
              <input type="text" className="form-control" id="inputNome" value={usuario.nome ?? ''} readOnly />
            </div>
            <div className="col-md-5">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="inputEmail4" value={usuario.email ?? ''} readOnly />
            </div>

            <div className="col-md-4">
              <label htmlFor="inputData" className="form-label">
                Data de Cadastro
              </label>
              <input type="text" className="form-control" id="inputData" readOnly value={usuario.dataCadastro ?? ''} />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputAcesso" className="form-label">
                Acesso
              </label>
              <select id="inputAcesso" className="form-select" defaultValue={usuario.nivelAcesso ?? ''}>
                <option value="" disabled>
                  Nível de acesso
                </option>
                <option value="ADMIN">Administrador</option>
                <option value="USER">Usuário</option>
              </select>
            </div>
            <div className="col-12 d-flex flex-wrap justify-content-end gap-2">
              <button type="button" className="btn btn-outline-warning">
                Reativar / Resetar a Senha
              </button>
              <button type="button" className="btn btn-outline-danger">
                Inativar Conta
              </button>
              <button type="submit" className="btn btn-primary">
                Gravar Alterações
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
