import React from 'react';
import ProjectForm from '../../components/Project/ProjectForm';

export default function CriarPasseio(): JSX.Element {
  return (
    <div>
        <nav className="fieb-logo">
          <br />
          <h1 className="title-bold">Vamos Viajar?</h1>
          <h3>Crie o próximo passeio da FIEB:</h3>
          <div>
            <ProjectForm />
          </div>
        </nav>
      </div>
  );
}
