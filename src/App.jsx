import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AppointmentsProvider } from './state/AppointmentsContext.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { AppShell } from './components/AppShell.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { OverviewPage } from './pages/OverviewPage.jsx'
import { PatientsPage } from './pages/PatientsPage.jsx'
import { AppointmentsPage } from './pages/AppointmentsPage.jsx'
import './styles.css'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppointmentsProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/app" element={<AppShell />}>
                  <Route index element={<OverviewPage />} />
                  <Route path="pacientes" element={<PatientsPage />} />
                  <Route path="consultas" element={<AppointmentsPage />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/app" replace />} />
            </Routes>
          </AppointmentsProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
