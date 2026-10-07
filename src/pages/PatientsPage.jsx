import { useDeferredValue, useEffect, useState } from 'react'
import { Search, Users } from 'lucide-react'
import { getPatients } from '../data/patientApi.js'
import { PatientTable } from './OverviewPage.jsx'

export function PatientsPage() {
  const [patients, setPatients] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const deferredQuery = useDeferredValue(query)
  const filteredPatients = patients.filter((patient) => `${patient.name} ${patient.condition} ${patient.email}`.toLocaleLowerCase('pt-BR').includes(deferredQuery.toLocaleLowerCase('pt-BR')))

  useEffect(() => {
    let active = true
    getPatients().then((items) => {
      if (active) {
        setPatients(items)
        setLoading(false)
      }
    })
    return () => { active = false }
  }, [])

  return (
    <>
      <div className="page-heading"><div><div className="eyebrow">Acompanhamento clínico</div><h1>Pacientes</h1><p>Consulte a base fictícia de pacientes da clínica.</p></div><span className="metric-icon"><Users aria-hidden="true" /></span></div>
      <section className="panel">
        <div className="panel-header">
          <h2>Todos os pacientes <span className="count-inline">({patients.length})</span></h2>
          <label className="search-field"><Search aria-hidden="true" /><span className="sr-only">Buscar pacientes</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome ou condição" /></label>
        </div>
        {loading ? <div className="empty-state">Carregando pacientes...</div> : filteredPatients.length ? <PatientTable patients={filteredPatients} /> : <div className="empty-state">Nenhum paciente corresponde à busca.</div>}
        <div className="table-count">{loading ? 'Carregando base local...' : `Exibindo ${filteredPatients.length} de ${patients.length} pacientes`}</div>
      </section>
    </>
  )
}