/**
 * Configura instâncias Axios usadas pela aplicação.
 *
 * @module common/http-common
 */
import axios from 'axios';

// const API_URL = "https://projeto.com.br/"; // produção
/**
 * URL base da API. Ajuste conforme ambiente (produção/desenvolvimento).
 *
 * @type {string}
 */
const API_URL = 'http://localhost:8080/'; // local(desenvolvimento)

/**
 * Instância Axios para requisições JSON padrão.
 *
 * @type {object}
 */
const mainInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

/**
 * Instância Axios para uploads multipart/form-data.
 *
 * @type {object}
 */
const multipartInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

/**
 * Objetos de instância exportados para uso em serviços.
 *
 * @typedef {object} HttpCommon
 * @property {*} mainInstance - Instância Axios para requisições JSON
 * @property {*} multipartInstance - Instância Axios para uploads multipart/form-data
 */

/** @type {HttpCommon} */
const httpCommom = {
  mainInstance,
  multipartInstance,
};

export default httpCommom;
