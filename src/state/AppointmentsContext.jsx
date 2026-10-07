import { createContext, useContext, useEffect, useReducer } from 'react'

const AppointmentsContext = createContext(null)
const STORAGE_KEY = 'cardioia.appointments'

function isoDay(offset) {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function createInitialAppointments() {
  return [
    { id: 'demo-1', patientId: 101, patientName: 'Helena Martins', date: isoDay(0), time: '09:00', type: 'Retorno', specialty: 'Cardiologia', status: 'Confirmada' },
    { id: 'demo-2', patientId: 102, patientName: 'Rafael Costa', date: isoDay(0), time: '10:30', type: 'Consulta', specialty: 'Eletrofisiologia', status: 'Confirmada' },
    { id: 'demo-3', patientId: 103, patientName: 'Beatriz Almeida', date: isoDay(0), time: '14:00', type: 'Avaliação', specialty: 'Cardiologia', status: 'Pendente' },
    { id: 'demo-4', patientId: 104, patientName: 'João Ferreira', date: isoDay(1), time: '08:30', type: 'Retorno', specialty: 'Cardiologia', status: 'Confirmada' },
  ]
}

function readAppointments() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(stored) ? stored : createInitialAppointments()
  } catch {
    return createInitialAppointments()
  }
}

function appointmentsReducer(state, action) {
  if (action.type === 'appointment/added') return [action.appointment, ...state]
  if (action.type === 'appointment/removed') return state.filter((item) => item.id !== action.id)
  return state
}

export function AppointmentsProvider({ children }) {
  const [appointments, dispatch] = useReducer(appointmentsReducer, undefined, readAppointments)
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments)) }, [appointments])
  return <AppointmentsContext.Provider value={{ appointments, dispatch }}>{children}</AppointmentsContext.Provider>
}

export function useAppointments() {
  const context = useContext(AppointmentsContext)
  if (!context) throw new Error('useAppointments deve ser usado dentro de AppointmentsProvider')
  return context
}