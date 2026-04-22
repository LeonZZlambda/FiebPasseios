## Código e Estilo

Padrões e convenções adotadas neste projeto:

- Estilo: JavaScript moderno (ES2021), ESM imports.
- Lint: ESLint com regras recomendadas para React + plugin JSDoc.
- Formatação: Prettier (configurada em `.prettierrc`).
- Comentários: Use JSDoc (estilo Google) para módulos, funções e componentes.

Boas práticas:
- Componentes React: componentes funcionais com hooks.
- Manter responsabilidade única por componente/serviço.
- Evitar lógica pesada no JSX — mova para hooks/serviços.
- Expor serviços via barrel exports (`src/services/index.js`).

Commits
- Mensagens claras e atômicas. Use `feature/` ou `fix/` nas branches.
