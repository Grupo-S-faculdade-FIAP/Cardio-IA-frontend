# CardioIA

Portal demonstrativo feito com React e Vite para apresentar autenticação simulada, pacientes fictícios, agenda e métricas simples.

## Executar

Requisitos: Node.js 20.19+ ou 22.12+ e npm.

```sh
npm install
npm run dev
```

O Vite imprime o endereço local após iniciar. Para validar antes de apresentar:

```sh
npm run lint
npm run build
```

## Acesso de demonstração

Abra `/login` e use o e-mail pré-preenchido ou qualquer e-mail válido. Não há senha nem autenticação real. O portal contém visão geral, lista pesquisável de pacientes e agendamento de consultas; agendamentos e preferência claro/escuro são salvos no `localStorage` deste navegador.

## Estrutura

- `src/context/`: estado de sessão demonstrativa.
- `src/components/ProtectedRoute.jsx`: proteção das páginas com dados.
- `src/data/patients.json` e `src/data/patientApi.js`: fixtures locais e API simulada.
- `src/state/`: reducer e persistência local de consultas.
- `src/pages/`: login, dashboard, pacientes e consultas.
- `specs/cardioia-portal/`: spec, plano e checklist SDD.
- `DESIGN.md`: tokens públicos consultados no DesignMD e decisões visuais do projeto.

## Limites

Todo conteúdo de paciente e consulta é fictício. O token com formato JWT é apenas uma demonstração armazenada em `localStorage`; não protege dados e não representa autenticação segura. Não inclua dados pessoais ou de saúde reais. Este protótipo não é destinado ao cuidado de pacientes nem a decisões clínicas.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
