// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    surname: '',
    email: '',
    phone: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const { username, password, name, surname, email, phone } = formData

    if (isRegister) {
      if (!username || !password || !name || !surname || !email || !phone) {
        setError('Todos los campos son obligatorios.')
        return
      }

      if (username === 'user') {
        setError('El usuario ya existe.')
        return
      }

      login({
        username: 'user',
        name,
        surname,
        email,
        phone
      })

      // ✅ Confirmación de registro y limpieza del formulario
      alert('Usuario registrado correctamente.')
      setFormData({
        username: '',
        password: '',
        name: '',
        surname: '',
        email: '',
        phone: ''
      })
      navigate(from, { replace: true })
    } else {
      if (!username || !password) {
        setError('Usuario y contraseña son obligatorios.')
        return
      }

      if (username === 'user' && password === 'user') {
        login({
          username: 'user',
          name: 'Usuario',
          surname: 'Demo',
          email: 'user@demo.com',
          phone: '+34 600 123 456'
        })

        // ✅ Limpieza y redirección segura al destino original
        setFormData({
          username: '',
          password: '',
          name: '',
          surname: '',
          email: '',
          phone: ''
        })
        navigate(from, { replace: true })
      } else {
        setError('Usuario o contraseña incorrectos.')
      }
    }
  }

  return (
    <div className="container" style={{ marginTop: '120px', maxWidth: '500px' }}>
      <div className="card shadow p-4">
        <h4 className="text-center mb-3">
          {isRegister ? 'Registro de usuario' : 'Iniciar sesión'}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {isRegister && (
            <>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellidos</label>
                <input
                  type="text"
                  name="surname"
                  className="form-control"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {error && <p className="text-danger text-center">{error}</p>}

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              {isRegister ? 'Registrarse' : 'Iniciar sesión'}
            </button>
          </div>
        </form>

        <hr />
        <div className="text-center">
          <button
            className="btn btn-link"
            onClick={() => {
              setIsRegister(!isRegister)
              setError('')
            }}
          >
            {isRegister
              ? '¿Ya tienes cuenta? Inicia sesión'
              : '¿No tienes cuenta? Regístrate aquí'}
          </button>
        </div>
      </div>
    </div>
  )
}
