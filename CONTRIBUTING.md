# Contributing

Obrigado por querer contribuir com este projeto! Siga estas orientações para acelerar revisões e manter a qualidade do código.

Fluxo básico
- Fork do repositório
- Crie uma branch com nome descritivo: `feature/descricao-curta` ou `fix/descricao-curta`
- Faça commits pequenos e atômicos com mensagens claras
- Abra um Pull Request descrevendo o propósito, mudanças principais e como testar

Padronização de código
- Siga as regras de ESLint já configuradas no projeto (`npm run lint`).
- Use convenções do JavaScript moderno (ESM, arrow functions, destructuring).

Documentação (JSDoc)
- Comente módulos, funções e componentes com JSDoc seguindo o estilo usado no projeto.
- Inclua `@param` e `@returns` quando aplicável. Exemplo:

```
/**
 * Soma dois números.
 * @param {number} a - Primeiro número.
 * @param {number} b - Segundo número.
 * @returns {number} A soma de `a` e `b`.
 */
function sum(a, b) {
  return a + b;
}
```

Testes locais e CI
- Execute `npm run lint` antes de abrir o PR.

Comunicação
- Descreva claramente o que o PR resolve e quais arquivos foram alterados.
- Peça revisão quando precisar de integração com o backend ou alterações de contrato de API.
