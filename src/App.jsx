import { useState, useEffect } from 'react';
import './App.css';
import TarjetaPersonaje from './Componentes/TarjetaPersonaje/TarjetaPersonaje';

const App = () => {
  // Guardo la lista completa de personajes que devuelve la API
  const [personajes, setPersonajes] = useState([]);
  // Controlo si la aplicación todavía está buscando los datos
  const [cargando, setCargando] = useState(true);
  // Guardo el texto que el usuario escribe en el buscador 
  const [busqueda, setBusqueda] = useState("");

  // --- CONSUMO DE DATOS ---
  // useEffect se ejecuta al montar el componente. Con ell array [] aseguro que solo pase una vez.
  useEffect(() => {
    // Realizo la petición asíncrona a la API de Rick and Morty 
    fetch("https://rickandmortyapi.com/api/character")
      .then((respuesta) => respuesta.json()) // la respuesta a JSON
      .then((data) => {
        // La API devuelve un objeto, los personajes están ahora en la propiedad results
        setPersonajes(data.results);
        // Una vez que tengo los datos, quito el estado de carga
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al traer los datos:", error);
        setCargando(false);
      });
  }, []);

  // --- FILTRADO ---
  // Creo una lista filtrada basada en el nombre 
  const personajesFiltrados = personajes.filter((p) =>
    // Conveierto todo a minúsculas para que la búsqueda no sea sensible a mayúsculas
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Encabezado de la App */}
      <header className="app-header">
        <h1 className="app-title">Rick &amp; Morty Explorer</h1>
        <p className="app-subtitle">Galactic Character Database</p>
      </header>

      {/*  Buscador */}
      <div className="buscador-container">
        <div className="buscador-wrapper">
          <input
            type="text"
            placeholder="Buscar personaje por nombre..."
            value={busqueda} // El valor del input depende del estado busqueda
            onChange={(e) => setBusqueda(e.target.value)} // Actualiza el estado al escribir
            className="buscador-input"
          />
          <span className="buscador-icon">⌕</span>
        </div>
      </div>

      {/* Barra de estadísticas */}
      {!cargando && (
        <p className="stats-bar">
          Mostrando <span>{personajesFiltrados.length}</span> de <span>{personajes.length}</span> personajes
        </p>
      )}

      {/*  Renderizado Condicional */}
      {cargando ? (
        // Caso 1: Mientras carga, muestro esqueletos grises 
        <div className="grid-personajes">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-img" />
              <div className="skeleton-text" />
              <div className="skeleton-text" style={{ width: '60%', margin: '0 14px 14px' }} />
            </div>
          ))}
        </div>
      ) : (
        // Caso 2: Cuando termina de cargar, muestro la lista
        <div className="grid-personajes">
          {personajesFiltrados.length > 0 ? (
            // Si hay resultados, mapeamos el array filtrado
            personajesFiltrados.map((personaje) => (
              <TarjetaPersonaje
                key={personaje.id} 
                personaje={personaje} // Pasamos la info como prop
              />
            ))
          ) : (
            // Caso 3: Si la búsqueda no arroja resultados 
            <p className="mensaje">No se encontraron personajes con ese nombre.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;