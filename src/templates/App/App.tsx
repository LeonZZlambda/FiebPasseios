import React from 'react';
import { Link } from 'react-router-dom';
import home from '../../assets/images/logo.png';

export default function App(): JSX.Element {
  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card card-xl card-elevated text-center" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body">
          <img src={home} alt="FIEB" style={{ width: '150px', marginBottom: 'var(--spacing-xl)' }} />
          <h1 className="h2 text-primary mb-md">
            Seja Bem-vindo(a) <br />à FIEB TOURS EDUCATIVOS
          </h1>
          <div className="mt-2xl">
            <h2 className="h3 text-secondary mb-lg">Selecione uma opção de login:</h2>
            <Link to={'/login'} style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary" type="button" style={{ padding: 'var(--spacing-md) var(--spacing-xl)', fontSize: 'var(--font-size-h3)' }}>
                #SouAdmin
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
