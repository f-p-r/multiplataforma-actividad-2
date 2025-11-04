// src/pages/Landing.jsx
import React from 'react'
import './Landing.css'

export default function Landing() {
  return (
    <div className='mt-5'>
      {/* Carrusel superior */}
      <div id="carouselLanding" className="carousel slide container-md" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="img/carrusel/1.jpg" className="d-block w-100" alt="Imagen 1" />
          </div>
          <div className="carousel-item">
            <img src="img/carrusel/2.jpg" className="d-block w-100" alt="Imagen 2" />
          </div>
          <div className="carousel-item">
            <img src="img/carrusel/3.jpg" className="d-block w-100" alt="Imagen 3" />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselLanding"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselLanding"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Sección principal */}
      <div className="landing-container container my-5">
        <h2 className="landing-title mb-4 text-center">Bienvenido a Nexus</h2>

        <div className="landing-flex">
          <div className="landing-text-image">
            <div className="landing-text-column">
              <img
                src="img/landing.jpg"
                alt="Espacio Nexus"
                className="landing-img"
              />
              <p className="landing-text">
                Nexus es mucho más que una librería: es un punto de encuentro diseñado
                para estudiantes, jóvenes profesionales y docentes en Aranjuez. Nuestro
                espacio multifuncional integra librería universitaria, coworking y
                cafetería en un entorno moderno, accesible y acogedor. Aquí puedes
                adquirir literatura académica especializada, trabajar de forma
                colaborativa o individual con conexión a internet, y disfrutar de un
                café mientras estudias o participas en uno de nuestros eventos.
              </p>
              <p className="landing-text">
                En Nexus creemos en la comunidad, el conocimiento y la conexión, por eso
                organizamos talleres, charlas y actividades que enriquecen la experiencia
                universitaria. Además, nuestra app te permite reservar espacios, consultar
                nuestro catálogo, pedir desde la cafetería y conectar con otros usuarios.
              </p>
              <p className="landing-text">
                Queremos ser tu lugar de referencia, donde aprender, crear y compartir sea
                parte del día a día. <strong>Bienvenido a Nexus: donde el conocimiento se encuentra.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
