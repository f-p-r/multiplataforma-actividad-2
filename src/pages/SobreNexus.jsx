// src/pages/SobreNexus.jsx
import React, { useEffect, useState } from 'react'
import { getLibraryInfo } from '../services/api'
import './SobreNexus.css'

const dayNames = {
  '1': 'Lunes',
  '2': 'Martes',
  '3': 'Miércoles',
  '4': 'Jueves',
  '5': 'Viernes',
  '6': 'Sábado',
  '7': 'Domingo'
}

function groupOpeningHours(openingHours) {
  const entries = Object.entries(openingHours)
    .map(([day, info]) => ({
      day,
      open: info.open,
      from: info.from,
      to: info.to
    }))
    .sort((a, b) => Number(a.day) - Number(b.day))

  const groups = []
  let currentGroup = null

  for (const entry of entries) {
    if (!entry.open) {
      if (currentGroup) {
        groups.push(currentGroup)
        currentGroup = null
      }
      groups.push({
        days: [entry.day],
        open: false
      })
    } else {
      if (
        currentGroup &&
        currentGroup.open &&
        currentGroup.from === entry.from &&
        currentGroup.to === entry.to
      ) {
        currentGroup.days.push(entry.day)
      } else {
        if (currentGroup) {
          groups.push(currentGroup)
        }
        currentGroup = {
          days: [entry.day],
          open: true,
          from: entry.from,
          to: entry.to
        }
      }
    }
  }

  if (currentGroup) {
    groups.push(currentGroup)
  }

  return groups
}

function formatDaysRange(days) {
  if (days.length === 1) {
    return dayNames[days[0]]
  }
  const first = dayNames[days[0]]
  const last = dayNames[days[days.length - 1]]
  return `De ${first} a ${last}`
}

export default function SobreNexus() {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getLibraryInfo()
      .then(data => setInfo(data))
      .catch(err => setError(err.message || err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="container-md sobre-nexus text-center">
        Cargando información…
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-md sobre-nexus text-center text-danger">
        Error al cargar la información: {error}
      </div>
    )
  }

  if (!info) return null

  const openingGroups = groupOpeningHours(info.openingHours)

  return (
    <div className="container-md sobre-nexus">
      <h2 className="text-center mb-4">{info.name}</h2>
      <p>{info.description}</p>
      <p><strong>Dirección:</strong> {info.address}</p>
      <p><strong>Teléfono:</strong> {info.phone}</p>
      <p><strong>Email:</strong> <a href={`mailto:${info.email}`}>{info.email}</a></p>
      <p><strong>Web:</strong> <a href="https://lawebdeperez.es/multiplataforma_a2" target="_blank" rel="noopener noreferrer">https://lawebdeperez.es/multiplataforma_a2</a></p>

      <h4 className="mt-4">Servicios que ofrecemos</h4>
      <ul className="no-bullets">
        {info.services.map((srv, idx) => <li key={idx}>{srv}</li>)}
      </ul>

      <h4 className="mt-4">Horarios</h4>
      <ul className="no-bullets">
        {openingGroups.map((grp, idx) => {
          const label = formatDaysRange(grp.days)
          if (!grp.open) {
            return <li key={idx}>{label}: Cerrado</li>
          }
          return <li key={idx}>{label}: de {grp.from} a {grp.to}</li>
        })}
      </ul>
    </div>
  )
}
