import { useEffect, useReducer, useState } from 'react'
import { CalendarPlus, Plus, Search, X } from 'lucide-react'
import { getPatients } from '../data/patientApi.js'
import { useAppointments } from '../state/AppointmentsContext.jsx'

const initialForm = { patientId: '', date: '', time: '', type: 'Consulta', specialty: 'Cardiologia' }

function formReducer(state, action) {
  if (action.type === 'field/changed') return { ...state, [action.name]: action.value }
  if (action.type === 'form/reset') return initialForm
  return state
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${dateString}T12:00:00`))
}

function localDayKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function AppointmentsPage() {
  const { appointments, dispatch } = useAppointments()
  const [patients, setPatients] = useState([])
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, formDispatch] = useReducer(formReducer, initialForm)
  const [error, setError] = useState('')
  const orderedAppointments = [...appointments].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
  const filteredAppointments = orderedAppointments.filter((item) => `${item.patientName} ${item.specialty} ${item.type}`.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')))

  useEffect(() => {
    let active = true
    getPatients().then((items) => { if (active) setPatients(items) })
    return () => { active = false }
  }, [])

  function closeModal() {
    setModalOpen(false)
    setError('')
    formDispatch({ type: 'form/reset' })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const patient = patients.find((item) => String(item.id) === form.patientId)
    const collision = appointments.some((item) => item.date === form.date && item.time === form.time)
    if (!patient || !form.date || !form.time) {
      setError('Preencha paciente, data e horário para continuar.')
      return
    }
    if (collision) {
      setError('Já existe uma consulta nesse horário. Escolha outro horário.')
      return
    }
    dispatch({ type: 'appointment/added', appointment: { ...form, id: crypto.randomUUID(), patientId: patient.id, patientName: patient.name, status: 'Confirmada' } })
    closeModal()
  }

  return (
    <>
      <div className="page-heading"><div><div className="eyebrow">Organização da clínica</div><h1>Consultas</h1><p>Agendamentos fictícios salvos neste navegador.</p></div><button className="button-primary" type="button" onClick={() => setModalOpen(true)}><CalendarPlus aria-hidden="true" /> Agendar consulta</button></div>
      <section className="panel">
        <div className="panel-header">
          <h2>Agenda <span className="count-inline">({appointments.length})</span></h2>
          <label className="search-field"><Search aria-hidden="true" /><span className="sr-only">Buscar consultas</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar paciente ou especialidade" /></label>
        </div>
        {filteredAppointments.length ? (
          <div className="appointments-table-wrap"><table className="patient-table appointments-table">
            <thead><tr><th>Paciente</th><th>Data e horário</th><th>Tipo</th><th>Especialidade</th><th>Status</th></tr></thead>
            <tbody>{filteredAppointments.map((item) => (
              <tr key={item.id}>
                <td><div className="patient-cell"><span className="patient-avatar">{item.patientName.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><div><strong>{item.patientName}</strong><span>Paciente CardioIA</span></div></div></td>
                <td>{formatDate(item.date)} · {item.time}</td><td>{item.type}</td><td>{item.specialty}</td><td><span className={`status-pill${item.status === 'Pendente' ? ' pending' : ''}`}>{item.status}</span></td>
              </tr>
            ))}</tbody>
          </table></div>
        ) : <div className="empty-state">Nenhuma consulta corresponde à busca.</div>}
        <div className="table-count">{filteredAppointments.length} consultas exibidas · armazenamento local</div>
      </section>
      {modalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal() }}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="appointment-title">
            <div className="modal-header"><div><h2 id="appointment-title">Agendar consulta</h2><p>Preencha os dados para adicionar à agenda local.</p></div><button className="icon-button" type="button" onClick={closeModal} aria-label="Fechar"><X aria-hidden="true" /></button></div>
            <form className="appointment-form" onSubmit={handleSubmit}>
              <div className="form-field"><label htmlFor="patient">Paciente</label><select id="patient" value={form.patientId} onChange={(event) => formDispatch({ type: 'field/changed', name: 'patientId', value: event.target.value })} required><option value="">Selecione um paciente</option>{patients.map((patient) => <option key={patient.id} value={patient.id}>{patient.name}</option>)}</select></div>
              <div className="form-grid">
                <div className="form-field"><label htmlFor="date">Data</label><input id="date" type="date" min={localDayKey(new Date())} value={form.date} onChange={(event) => formDispatch({ type: 'field/changed', name: 'date', value: event.target.value })} required /></div>
                <div className="form-field"><label htmlFor="time">Horário</label><input id="time" type="time" value={form.time} onChange={(event) => formDispatch({ type: 'field/changed', name: 'time', value: event.target.value })} required /></div>
              </div>
              <div className="form-grid">
                <div className="form-field"><label htmlFor="type">Tipo de consulta</label><select id="type" value={form.type} onChange={(event) => formDispatch({ type: 'field/changed', name: 'type', value: event.target.value })}><option>Consulta</option><option>Retorno</option><option>Avaliação</option><option>Teleconsulta</option></select></div>
                <div className="form-field"><label htmlFor="specialty">Especialidade</label><select id="specialty" value={form.specialty} onChange={(event) => formDispatch({ type: 'field/changed', name: 'specialty', value: event.target.value })}><option>Cardiologia</option><option>Eletrofisiologia</option><option>Ecocardiografia</option><option>Prevenção cardiovascular</option></select></div>
              </div>
              {error && <div className="form-error" role="alert">{error}</div>}
              <div className="form-actions"><button className="button-secondary" type="button" onClick={closeModal}>Cancelar</button><button className="button-primary" type="submit"><Plus aria-hidden="true" /> Salvar consulta</button></div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}