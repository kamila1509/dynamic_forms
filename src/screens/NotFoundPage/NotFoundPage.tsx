import React from 'react';
import NotFoundImage from '../../assets/not-found.gif'; // Asegúrate de tener la ruta correcta al archivo GIF
import './styles.css';

const NotFoundPage = () => {
  return (
    <div className='not-found-container'>
      {/* Añade la etiqueta <img> con la ruta al GIF */}
      <img src={NotFoundImage} alt="Not Found" className='not-found-image' />
      <div>
        <a className='link' href="/admin">Ir al Dashboard</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
 