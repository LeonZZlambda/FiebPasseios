# FiebPasseios

Aplicação front-end construída com React + Vite para gerenciamento de passeios.

Visão geral
-
Este repositório contém a UI (Vite + React) usada para gerenciar passeios, com integração a APIs via Axios e estilos com Bootstrap.

Principais tecnologias
-
- React
- Vite
- Axios
- Bootstrap

Pré-requisitos
-
- Node.js >= 16
- npm ou yarn

Instalação e execução
-
1. Instale dependências:

	npm install

2. Inicie em modo desenvolvimento:

	npm run dev

Scripts úteis
-
- `npm run dev` — inicia o servidor de desenvolvimento (Vite)
- `npm run build` — gera build de produção
- `npm run preview` — pré-visualiza o build de produção
- `npm run lint` — executa o ESLint configurado
- `npm run docs` — gera a documentação JSDoc em `./docs` (requer `jsdoc` como devDependency)

Documentação (JSDoc)
-
Este projeto usa JSDoc para comentários de código (seguindo o padrão Google/JSDoc para JavaScript/JSX). A configuração de geração está em `jsdoc.json` e a saída é escrita em `./docs`.

Gerar documentação localmente:

1. Instale a dependência de desenvolvimento (se ainda não instalou):

	npm install --save-dev jsdoc

2. Gere a documentação:

	npm run docs

Padrões de documentação
-
- Use comentários JSDoc em módulos, funções e componentes React.
- Inclua `@param` e `@returns` quando aplicável, e uma breve descrição em português.
- Exemplos de uso e tipos com `import('axios').AxiosInstance` são bem-vindos para tipagem nos comentários.

Contribuindo
-
Veja `CONTRIBUTING.md` para orientações sobre estilo, commits e pull-requests.

Licença
-
Este projeto é licenciado sob a licença MIT — consulte o arquivo `LICENSE`.

