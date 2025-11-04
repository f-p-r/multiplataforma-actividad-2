// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import PreguntasFrecuentesModal from './PreguntasFrecuentesModal'
import MisDatosModal from './MisDatosModal'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showFAQ, setShowFAQ] = useState(false)
  const [showDatos, setShowDatos] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark fixed-top"
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <div className="container-md">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="img/logo.webp" alt="Logo Nexus" height="70" />
          </Link>

          {/* Botón colapsable */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú principal */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/novedades">Novedades</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/mas-vendidos">Más vendidos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to='undefined'
                  onClick={(e) => {
                    e.preventDefault()
                    setShowFAQ(true)
                  }}
                >
                  Preguntas frecuentes
                </NavLink>
              </li>
            </ul>

            {/* Lado derecho: login o usuario */}
            <ul className="navbar-nav ms-auto">
              {!user ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Registrarse / Iniciar sesión
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userMenu"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.username}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userMenu"
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setShowDatos(true)}
                      >
                        Mis datos
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Modales */}
      {showFAQ && <PreguntasFrecuentesModal onClose={() => setShowFAQ(false)} />}
      {showDatos && <MisDatosModal onClose={() => setShowDatos(false)} />}
    </>
  )
}
