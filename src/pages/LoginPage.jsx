import { useState } from 'react'
import { ArrowRight, HeartPulse, ShieldCheck } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('dra.mariana@cardioia.com')
  const [error, setError] = useState('')

  if (user) return <Navigate to="/app" replace />

  function handleSubmit(event) {
    event.preventDefault()
    if (!email.includes('@') || !email.includes('.')) {
      setError('Informe um e-mail válido para continuar.')
      return
    }
    login(email.trim())
    navigate('/app', { replace: true })
  }

  return (
    <main className="login-page">
      <section className="login-story" aria-label="CardioIA">
        <div className="login-brand"><span className="brand-mark"><HeartPulse aria-hidden="true" /></span><span>CardioIA</span></div>
        <div className="login-copy">
          <div className="eyebrow">Cuidado que acompanha</div>
          <h1>Mais clareza para cuidar de cada coração.</h1>
          <p>Um espaço simples para acompanhar pacientes, organizar consultas e manter o cuidado em movimento.</p>
          <div className="login-visual" aria-hidden="true">
            <div className="pulse-label"><span /> Monitoramento em dia</div>
            <svg className="pulse-line" viewBox="0 0 440 64" preserveAspectRatio="none">
              <path d="M0 34h90l13-1 10-12 13 31 15-43 18 39 12-14h76l11-1 14-14 14 29 15-38 17 34 12-9h100" />
            </svg>
          </div>
        </div>
        <div className="login-footer">CardioIA · Ambiente acadêmico demonstrativo</div>
      </section>
      <section className="login-panel">
        <div className="login-card">
          <div className="login-brand mobile-brand"><span className="brand-mark"><HeartPulse aria-hidden="true" /></span><span>CardioIA</span></div>
          <div className="eyebrow">Acesso ao portal</div>
          <h2>Bem-vinda de volta</h2>
          <p>Entre para acessar seu painel de acompanhamento.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-field"><label htmlFor="email">E-mail profissional</label><input id="email" autoComplete="username" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError('') }} required /></div>
            {error && <div className="form-error" role="alert">{error}</div>}
            <button className="button-primary" type="submit">Entrar no portal <ArrowRight aria-hidden="true" /></button>
          </form>
          <div className="demo-note"><ShieldCheck aria-hidden="true" /><span><strong>Acesso de demonstração.</strong> Não há autenticação real; qualquer e-mail válido permite entrar.</span></div>
          <div className="login-disclaimer">Este protótipo usa dados fictícios e não deve ser utilizado para decisões clínicas ou armazenamento de informações reais.</div>
        </div>
      </section>
    </main>
  )
}