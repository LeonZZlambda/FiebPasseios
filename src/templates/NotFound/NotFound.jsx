import DeadLink from '../../assets/images/404.png';

/**
 * Página 404 (Not Found).
 *
 * @returns {any} Elemento 404
 */
function NotFound() {
  return (
    <div>
      <div className="fieb-logo">
        <h2 className="titleError">Ops, parece que você encontrou um link morto :P</h2>
        <img src={DeadLink} alt="Error404" className="Error" />
        <h1 className="title1">404</h1>
      </div>
    </div>
  );
}

export default NotFound;
