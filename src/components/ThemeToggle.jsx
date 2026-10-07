import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const label = theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'
  const Icon = theme === 'dark' ? Sun : Moon

  return (
    <button className={`icon-button theme-toggle ${className}`} type="button" aria-label={label} title={label} aria-pressed={theme === 'dark'} onClick={toggleTheme}>
      <Icon aria-hidden="true" />
    </button>
  )
}