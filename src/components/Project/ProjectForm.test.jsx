import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectForm from './ProjectForm.jsx';

describe('ProjectForm', () => {
  it('renderiza campos principais do formulário', () => {
    render(<ProjectForm />)
    expect(screen.getByPlaceholderText(/Insira o nome do passeio/i)).toBeTruthy()
  });
});
