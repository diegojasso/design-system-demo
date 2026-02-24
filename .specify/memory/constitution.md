# Quote Website — Constitution (Working Summary)

This is a **working summary** used by the Speckit planning workflow. The full source of truth is `./.speckit/constitution.md`.

## Non-negotiables (high-signal)

- **Server/client separation**: server-only code under `apps/agent-portal/app/**` and `apps/agent-portal/src/server/**`; UI/screens under `apps/agent-portal/src/pages/**` must not call backends directly.
- **No secrets to client**: secrets must never be exposed to the browser, logs, analytics, or user-visible error messages.
- **Runtime validation at boundaries**: external inputs (including runtime configuration) must be validated (e.g., with Zod) at the boundary.
- **Observability**: key flows emit standardized events; no ad-hoc event names; no PII in events.
- **Performance**: avoid blocking UI; prefer server-side fetches and explicit caching policy; target sub-second interactions where feasible.

## Repo layout (baseline)

```text
apps/
  agent-portal/
    app/
    src/
      server/
      pages/
packages/
  ui/
  analytics/
  api-client/
```
