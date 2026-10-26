# Onix

Onix is a monorepo for an AI-assisted engineering workspace with:
- desktop UI for Git graph visualization
- backend orchestration with FastAPI + LiteLLM
- multi-provider AI routing
- secure provider access through an OIDC proxy

## Architecture

```text
apps/
  desktop/       # Electron + React UI
  backend/       # Python FastAPI API + LiteLLM
  orchestrator/  # Go-based router/orchestrator (scaffold)
packages/
  protocol/      # shared TS contracts
infra/
  cloudflare/
    oidc-proxy/  # Cloudflare Worker OIDC gateway
```

## Quick start

### Backend

```bash
cd apps/backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Worker (Cloudflare)

```bash
cd infra/cloudflare/oidc-proxy
npm install
npx wrangler dev
```

### Desktop

```bash
cd apps/desktop
npm install
npm run dev
```

## Notes

This is the initial functional scaffold for Onix. The backend exposes a simple chat endpoint and the worker provides the OIDC proxy pattern for secure upstream provider routing.
