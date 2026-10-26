# Onix

Onix es un monorepo para una plataforma de ingeniería asistida por IA con visualización de grafos Git, routing inteligente multi-agente y acceso seguro a proveedores de IA a través de OIDC.

## Arquitectura

- apps/desktop: frontend de escritorio con Electron + React.
- apps/backend: backend Python con FastAPI y LiteLLM.
- apps/orchestrator: orquestador central con routing y agentes.
- packages/protocol: tipos y contratos compartidos.
- infra/cloudflare/oidc-proxy: proxy OIDC para reenvío seguro de peticiones.

## Stack previsto

- Frontend: Electron + React + TypeScript
- Backend: Python + FastAPI + LiteLLM
- Orquestador: Go / router lógico
- Infra: Cloudflare Worker + GitHub OIDC
- Comunicación: JSON + MCP / stdio

## Estructura principal

```text
apps/
  desktop/
  backend/
  orchestrator/
packages/
  protocol/
infra/
  cloudflare/
```

## Objetivo

Unificar visualización, coordinación de agentes IA y acceso seguro a proveedores como Anthropic, OpenAI y Gemini bajo un mismo sistema.
