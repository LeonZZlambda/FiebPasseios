import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import UsuarioService from '../../services/UsuarioService';
import './Usuario.css';

type Usuario = {
  id: string | number;
  nome: string;
  email: string;
  nivelAcesso: string;
  dataCadastro: string;
  statusUsuario: string;
};

export default function UsuariosLista(): JSX.Element {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    UsuarioService.getAllUsuarios()
      .then((response) => setUsuarios(response.data ?? []))
      .catch((error) => console.log(error));
  }, []);

  const filteredUsuarios = useMemo(
    () =>
      usuarios.filter((usuario) => {
        const term = query.toLowerCase();
        return (
          usuario.nome.toLowerCase().includes(term) ||
          usuario.email.toLowerCase().includes(term) ||
          usuario.nivelAcesso.toLowerCase().includes(term) ||
          String(usuario.id).includes(term)
        );
      }),
    [usuarios, query]
  );

  const getId = (id: string | number) => {
    navigate(`/usuarioeditar/${id}`);
  };

  return (
    <div className="management-page">
      <Header goto="/usuario" title="Lista de Usuários" logo={logo} />
      <div className="container management-shell">
        <section className="management-card">
          <div className="management-card-header">
            <div>
              <h2 className="management-card-title">Usuários cadastrados</h2>
              <p className="management-description mb-0">
                Busque por nome, e-mail, perfil ou ID e abra rapidamente a conta desejada.
              </p>
            </div>
            <div className="management-filters">
              <input
                type="search"
                className="form-control user-search"
                placeholder="Buscar usuário..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>

          <div className="user-summary-grid">
            <div className="user-summary-card">
              <span>Total</span>
              <strong>{usuarios.length}</strong>
            </div>
            <div className="user-summary-card">
              <span>Filtrados</span>
              <strong>{filteredUsuarios.length}</strong>
            </div>
            <div className="user-summary-card">
              <span>Ativos</span>
              <strong>{usuarios.filter((u) => u.statusUsuario === 'ATIVO').length}</strong>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table align-middle table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Acesso</th>
                  <th scope="col">Cadastro</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-secondary py-4">
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredUsuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td className="text-secondary">{usuario.id}</td>
                      <td className="fw-semibold">{usuario.nome}</td>
                      <td>{usuario.email}</td>
                      <td>
                        <span className="badge text-bg-light">{usuario.nivelAcesso}</span>
                      </td>
                      <td className="text-secondary">{usuario.dataCadastro}</td>
                      <td>
                        <span className={`status-pill status-${usuario.statusUsuario.toLowerCase()}`}>
                          {usuario.statusUsuario}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          onClick={() => getId(usuario.id)}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Abrir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
