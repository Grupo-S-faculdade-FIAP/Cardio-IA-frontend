import { Activity, CalendarDays, HeartPulse, LayoutDashboard, LogOut, Users } from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from './AppShell.module.css'

const navigation = [
  { to: '/app', label: 'Visão geral', icon: LayoutDashboard, end: true },
  { to: '/app/pacientes', label: 'Pacientes', icon: Users },
  { to: '/app/consultas', label: 'Consultas', icon: CalendarDays },
]

const pageNames = { '/app': 'Visão geral', '/app/pacientes': 'Pacientes', '/app/consultas': 'Consultas' }

export function AppShell() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const displayName = user?.name || 'Mariana'
  const today = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date())

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className={`${styles.shell} app-shell`}>
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><HeartPulse aria-hidden="true" /></span><span>CardioIA</span></div>
        <p className="workspace-label">Workspace clínico</p>
        <nav className="nav-list" aria-label="Navegação principal">
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <Icon aria-hidden="true" />{label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note"><strong><Activity size={13} /> Ambiente demonstrativo</strong><p>Dados fictícios para apresentação. Nenhuma informação é enviada a um servidor.</p></div>
          <div className="profile-row">
            <span className="profile-avatar">{displayName.slice(0, 1).toUpperCase()}</span>
            <div className="profile-details"><strong>Dra. {displayName}</strong><span>{user?.role || 'Cardiologista'}</span></div>
            <button className="icon-button" type="button" aria-label="Sair" title="Sair" onClick={handleLogout}><LogOut aria-hidden="true" /></button>
          </div>
        </div>
      </aside>
      <div className="main-area">
        <header className="topbar">
          <div className="breadcrumb">CardioIA <span aria-hidden="true"> / </span> <strong>{pageNames[location.pathname] || 'Consultas'}</strong></div>
          <div className="topbar-actions"><span className="today-label">{today}</span><span className="profile-avatar">{displayName.slice(0, 1).toUpperCase()}</span></div>
        </header>
        <main className="main-content"><Outlet /></main>
      </div>
    </div>
  )
}