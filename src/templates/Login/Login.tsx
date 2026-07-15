import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fiebWhite from '../../assets/images/fiebl.png';
import './Login.css';

export default function Login(): JSX.Element {
  const navigate = useNavigate();

  const goto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/Home');
  };

  const backto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="container login-container">
        <div className="card card-xl card-elevated login-card">
          <div className="card-body login-card-body">
            <img src={fiebWhite} alt="FIEB Logo" className="login-logo" />

            <form className="login-form">
              <div className="mb-md">
                <label htmlFor="email" className="login-label">
                  Email
                </label>
                <input type="email" id="email" className="form-control login-input" required />
              </div>

              <div className="mb-md">
                <label htmlFor="password" className="login-label">
                  Senha
                </label>
                <input type="password" id="password" className="form-control login-input" required />
              </div>

              <div className="login-help">
                <Link to="/forgotpass" className="login-forgot-link">
                  Esqueceu a senha?
                </Link>
              </div>

              <div className="d-none mb-md" id="infos">
                <p className="login-error">Dados incorretos.</p>
              </div>

              <div className="login-actions">
                <button className="btn btn-outline-light login-secondary-btn" type="button" onClick={backto}>
                  Cancelar
                </button>
                <button className="btn btn-primary login-primary-btn" type="submit" onClick={goto}>
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
