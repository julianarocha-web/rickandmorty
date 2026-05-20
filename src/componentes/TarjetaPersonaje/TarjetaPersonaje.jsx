import styles from './TarjetaPersonaje.module.css';

const TarjetaPersonaje = ({ personaje }) => {
  const { id, name, status, species, origin, image } = personaje;

  // 1. Convertimos el status a minúsculas para que coincida con las clases del CSS Module
  const statusKey = status.toLowerCase(); // 'alive', 'dead' o 'unknown'

  const statusLabel =
    status === 'Alive' ? 'Vivo' :
    status === 'Dead'  ? 'Muerto' :
    'Desconocido';

  return (
    <div className={styles.card}>

      {/* Imagen con overlay y badge de estado  */}
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} />
        <div className={styles.statusBadge}>
          {/* Usamos corchetes para acceder dinámicamente a styles['alive'], etc. */}
          <span className={`${styles.statusDot} ${styles[statusKey]}`} />
          {statusLabel}
        </div>
      </div>

      {/* Info  */}
      <div className={styles.info}>
        <h3>{name}</h3>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Especie</span>
            <span className={styles.metaValue}>{species}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Origen</span>
            <span className={styles.metaValue}>{origin.name}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <span className={styles.idBadge}>#{String(id).padStart(3, '0')}</span>
        <span className={styles.verMas}>Ver más →</span>
      </div>

    </div>
  );
};

export default TarjetaPersonaje;