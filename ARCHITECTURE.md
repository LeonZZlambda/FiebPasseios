## Arquitetura e organização do repositório

Estrutura principal:

- `src/` — código-fonte da aplicação.
  - `components/` — componentes React organizados por feature.
  - `services/` — chamadas HTTP e lógica de integração (usar barrel exports).
  - `templates/` — páginas/rotas principais.
  - `common/` — utilitários e instâncias (ex.: `http-common.js`).

Princípios:
- Modularização por feature: cada pasta contém componentes, estilos e testes da feature.
- Serviços centralizados: evite chamadas HTTP espalhadas pelo código.
- Documentação: use JSDoc e mantenha `docs/` atualizado via `npm run docs`.
