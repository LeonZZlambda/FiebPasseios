import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const defaultTripImage = '/static/home.png';

export default function Home(): JSX.Element {
  const [data, setData] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    fetch('/static/passeios.json')
      .then((response) => response.json())
      .then(setData)
      .catch((err) => console.error('Failed to load passeios:', err));
  }, []);

  const visibleTrips = data.slice(0, visibleCount);

  return (
    <div>
      <div className="mb-2xl">
        <h1 className="h1 text-primary mb-xs">Passeios Disponíveis</h1>
        <h2 className="h4 text-secondary font-regular">Passeios que estão em andamento e podem ser editados:</h2>
      </div>

      <div className="card-grid card-grid-auto">
        {visibleTrips.map((item: any) => {
              const { id, name, quant, price, unitd, local, data: dateField, image } = item;
              return (
                <div className="card card-elevated" key={id}>
                  {image && (
                    <img
                      src={image}
                      alt={name}
                      className="card-image card-image-top"
                      loading="lazy"
                      decoding="async"
                      width="640"
                      height="360"
                      onError={(event) => {
                        const target = event.currentTarget;
                        if (target.src !== defaultTripImage) {
                          target.src = defaultTripImage;
                        }
                      }}
                    />
                  )}
              <div className="card-body">
                <h3 className="card-body-title">{name}</h3>
                <div className="mb-md">
                  <span className="badge badge-solid-primary mr-sm">{unitd}</span>
                </div>
                <div className="text-secondary small mb-xs d-flex align-items-center">
                  <i className="bi bi-geo-alt mr-xs"></i> {local}
                </div>
                <div className="text-secondary small mb-xs d-flex align-items-center">
                  <i className="bi bi-calendar mr-xs"></i> {dateField}
                </div>
                <div className="text-secondary small mb-xs d-flex align-items-center">
                  <i className="bi bi-people mr-xs"></i> {quant} alunos
                </div>
                <div className="text-primary font-bold mt-md h3">
                  R$ {price}
                </div>
              </div>
              <div className="card-footer">
                <Link
                  to={`/trips/${id}/edit`}
                  className="btn btn-primary w-100 text-center text-inverse"
                  style={{ textDecoration: 'none' }}
                  aria-label={`Editar passeio ${name}`}
                >
                  Editar {name}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {data.length > visibleCount && (
        <div className="d-flex justify-content-center mt-xl">
          <button type="button" className="btn btn-outline-primary" onClick={() => setVisibleCount((count) => count + 4)}>
            Carregar mais passeios
          </button>
        </div>
      )}
    </div>
  );
}
