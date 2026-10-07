import patients from './patients.json'

export function getPatients() {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(patients), 220)
  })
}