import React from 'react';
import './styles.css'; // Asegúrate de tener un archivo CSS para estilos si es necesario

const ThankYouPage = () => {
  return (
    <div className="content">
      <div className="wrapper-1">
        <div className="wrapper-2">
          <h1>Thank you !</h1>
          <p>Thanks for answering to our Form.</p>
          <button onClick={()=> {
            window.history.back()
          }} className="go-home">Retry</button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
