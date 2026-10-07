import { useEffect, useState } from 'react'
import { Activity, ArrowRight, CalendarCheck2, CalendarPlus, Clock3, HeartPulse, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getPatients } from '../data/patientApi.js'
import { useAppointments } from '../state/AppointmentsContext.jsx'

function localDayKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDay(dateString) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(new Date(`${dateString}T12:00:00`))
}

function getWeekCounts(appointments) {
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - ((today.getDay() + 6) % 7))
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return {
      label: new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date).replace('.', ''),
      count: appointments.filter((appointment) => appointment.date === localDayKey(date)).length,
    }
  })
}

export function OverviewPage() {
  const { appointments } = useAppointments()
  const [patients, setPatients] = useState([])
  const todayKey = localDayKey(new Date())
  const todaysAppointments = appointments.filter((appointment) => appointment.date === todayKey).sort((first, second) => first.time.localeCompare(second.time))
  const weekCounts = getWeekCounts(appointments)
  const maxCount = Math.max(1, ...weekCounts.map((day) => day.count))

  useEffect(() => {
    let active = true
    getPatients().then((items) => { if (active) setPatients(items) })
    return () => { active = false }
  }, [])

  return (
    <>
      <div className="page-heading">
        <div><div className="eyebrow">Cuidado em foco</div><h1>Visão geral</h1><p>Um resumo do acompanhamento e da agenda da clínica.</p></div>
        <Link className="button-primary" to="/app/consultas"><CalendarPlus aria-hidden="true" /> Nova consulta</Link>
      </div>
      <section className="metric-grid" aria-label="Indicadores">
        <MetricCard icon={Users} label="Pacientes cadastrados" value={patients.length} foot="Base demonstrativa local" />
        <MetricCard icon={CalendarCheck2} label="Consultas agendadas" value={appointments.length} foot="Na agenda da clínica" />
        <MetricCard icon={Clock3} label="Consultas hoje" value={todaysAppointments.length} foot="Atendimentos previstos" orange />
        <MetricCard icon={HeartPulse} label="Em acompanhamento" value={patients.filter((patient) => patient.status === 'Acompanhamento').length} foot="Pacientes ativos" />
      </section>
      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-header"><h2>Agenda de hoje</h2><Link className="text-link" to="/app/consultas">Ver agenda <ArrowRight aria-hidden="true" /></Link></div>
          {todaysAppointments.length ? <div className="appointment-list">{todaysAppointments.map((appointment) => (
            <div className="appointment-row" key={appointment.id}>
              <span className="time-block">{appointment.time}</span>
              <div className="appointment-person"><strong>{appointment.patientName}</strong><span>{appointment.type} · {appointment.specialty}</span></div>
              <span className={`status-pill${appointment.status === 'Pendente' ? ' pending' : ''}`}>{appointment.status}</span>
            </div>
          ))}</div> : <div className="empty-state">Nenhuma consulta prevista para hoje.</div>}
        </section>
        <section className="panel">
          <div className="panel-header"><h2>Ritmo da semana</h2><Activity size={16} color="var(--teal)" aria-hidden="true" /></div>
          <div className="week-chart">
            <div className="chart-summary"><strong>{appointments.length}</strong><span>consultas na agenda</span></div>
            <div className="chart-bars" role="img" aria-label="Consultas agendadas por dia nesta semana">
              {weekCounts.map((day, index) => <div className="chart-column" key={`${day.label}-${index}`}><div className="chart-bar" style={{ height: `${Math.max(8, (day.count / maxCount) * 78)}px`, animationDelay: `${index * 40}ms` }} title={`${day.count} consultas`} /><span className="chart-label">{day.label}</span></div>)}
            </div>
          </div>
        </section>
      </div>
      <section className="panel dashboard-lower">
        <div className="panel-header"><h2>Pacientes recentes</h2><Link className="text-link" to="/app/pacientes">Ver pacientes <ArrowRight aria-hidden="true" /></Link></div>
        <PatientTable patients={patients.slice(0, 4)} />
      </section>
    </>
  )
}

function MetricCard({ icon: Icon, label, value, foot, orange = false }) {
  return <article className="metric-card"><div className="metric-top"><span>{label}</span><span className={`metric-icon${orange ? ' orange' : ''}`}><Icon aria-hidden="true" /></span></div><div className="metric-value">{value}</div><div className="metric-foot">{foot}</div></article>
}

export function PatientTable({ patients }) {
  if (!patients.length) return <div className="empty-state">Carregando pacientes...</div>
  return (
    <div className="patient-table-wrap">
      <table className="patient-table">
        <thead><tr><th>Paciente</th><th>Condição</th><th>Última consulta</th><th>Status</th></tr></thead>
        <tbody>{patients.map((patient) => (
          <tr key={patient.id}>
            <td><div className="patient-cell"><span className={`patient-avatar ${patient.tone}`}>{patient.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><div><strong>{patient.name}</strong><span>{patient.age} anos · {patient.email}</span></div></div></td>
            <td>{patient.condition}</td><td>{formatDay(patient.lastVisit)}</td><td><span className="status-pill">{patient.status}</span></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  )
}