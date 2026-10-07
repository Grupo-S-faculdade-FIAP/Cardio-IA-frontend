# Spec-driven workflow

The repository keeps feature requirements, architecture decisions, and implementation tasks together under `specs/<feature>/`.

1. Write or update `spec.md` with goal, scope, exclusions, and observable acceptance criteria.
2. Record the implementation boundary and data flow in `plan.md`.
3. Turn acceptance criteria into a checkable list in `tasks.md` before implementation.
4. Mark tasks complete as behavior is implemented; keep verification tasks open until checks actually pass.
5. At handoff, report any unmet acceptance criteria or unavailable checks. The project rules live in `.github/copilot-instructions.md` and `.specify/memory/constitution.md`.