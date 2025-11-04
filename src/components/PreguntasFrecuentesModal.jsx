import { useState } from 'react'
import './PreguntasFrecuentesModal.css'

export default function PreguntasFrecuentesModal({ onClose }) {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: '¿Qué servicios ofrece Nexus?',
      answer:
        'Nexus combina librería universitaria, zona de coworking y cafetería en un único espacio. Además, organizamos talleres y actividades para la comunidad universitaria.'
    },
    {
      question: '¿Puedo reservar un espacio de coworking?',
      answer:
        'Sí. Desde la aplicación puedes consultar la disponibilidad y reservar espacios de trabajo de manera sencilla.'
    },
    {
      question: '¿Hay descuentos para estudiantes?',
      answer:
        'Sí, ofrecemos descuentos especiales para estudiantes en libros y servicios de coworking. Solo necesitas mostrar tu identificación universitaria.'
    },
    {
      question: '¿Cómo puedo contactar con Nexus?',
      answer:
        'Puedes escribirnos a contacto@nexus.com o visitarnos en Av. de la Universidad, 123, Ciudad Nexus. Nuestro horario es de lunes a viernes de 9:00 a 20:00.'
    }
  ]

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <>
      {/* Fondo oscuro con click para cerrar */}
      <div
        className="modal-backdrop fade show"
        style={{
          backgroundColor: '#0009',
          backdropFilter: 'blur(2px)',
          zIndex: 1040
        }}
        onClick={onClose}
      ></div>

      {/* Ventana modal */}
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-4 position-relative rounded-3 shadow-lg">
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={onClose}
            ></button>

            <h5 className="mb-3 text-center">❓ Preguntas frecuentes</h5>

            <div className="accordion">
              {faqs.map((faq, i) => (
                <div key={i} className="mb-2">
                  <button
                    className={`accordion-header w-100 ${activeIndex === i ? 'activa' : ''}`}
                    onClick={() => toggle(i)}
                  >
                    {faq.question}
                  </button>

                  <div className={`accordion-body ${activeIndex === i ? 'show' : ''}`}>
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
