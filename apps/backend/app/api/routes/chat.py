from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from app.api.deps import require_token
from app.services.llm_service import generate_reply

router = APIRouter(prefix="/api", tags=["chat"])


class ChatRequest(BaseModel):
    prompt: str
    provider: str | None = None
    system_prompt: str | None = None


class ChatResponse(BaseModel):
    reply: str
    provider: str | None = None
    model: str | None = None


@router.post("/chat", response_model=ChatResponse)
async def chat_with_model(
    payload: ChatRequest,
    token: str = Depends(require_token),
) -> ChatResponse:
    if not payload.prompt or not payload.prompt.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Prompt is required",
        )

    reply = await generate_reply(
        prompt=payload.prompt,
        provider=payload.provider,
        system_prompt=payload.system_prompt,
        token=token,
    )

    return ChatResponse(
        reply=reply["content"],
        provider=reply.get("provider"),
        model=reply.get("model"),
    )
