import { useAuth } from '../context/AuthContext'

export default function MisDatosModal({ onClose }) {
  const { user } = useAuth()

  if (!user) return null

  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{
          backgroundColor: '#0009',
          backdropFilter: 'blur(2px)',
          zIndex: 1040
        }}
        onClick={onClose}
      ></div>

      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4 position-relative rounded-3 shadow-lg">
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={onClose}
            ></button>

            <h5 className="text-center mb-3">👤 Mis datos</h5>

            <ul className="list-group">
              <li className="list-group-item">
                <strong>Usuario:</strong> {user.username}
              </li>
              <li className="list-group-item">
                <strong>Nombre:</strong> {user.name}
              </li>
              <li className="list-group-item">
                <strong>Apellidos:</strong> {user.surname}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {user.email}
              </li>
              <li className="list-group-item">
                <strong>Teléfono:</strong> {user.phone}
              </li>
            </ul>

            <div className="text-center mt-3">
              <button className="btn btn-primary" onClick={onClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
