/**
 * Serviço para interagir com endpoints de `usuario`.
 *
 * @module services/UsuarioService
 */
import http from '../common/http-common';

/** Base de rota para recursos de usuário */
const API_URL = 'usuario/';

/**
 * Busca todos os usuários.
 *
 * @returns {Promise<any>} Promise que resolve com a resposta do servidor
 */
const getAllUsuarios = () => {
  return http.mainInstance.get(API_URL + 'findAll');
};

/**
 * Busca usuário por id.
 *
 * @param {string|number} id - Identificador do usuário
 * @returns {Promise<any>} Promise que resolve com a resposta do servidor
 */
const getById = (id) => {
  return http.mainInstance.get(API_URL + `findById/${id}`);
};

const UsuarioService = {
  getAllUsuarios,
  getById,
};

export default UsuarioService;
