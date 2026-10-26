from typing import Any

import litellm
from litellm import completion

from app.core.config import get_settings


async def generate_reply(
    prompt: str,
    provider: str | None = None,
    system_prompt: str | None = None,
    token: str | None = None,
) -> dict[str, Any]:
    settings = get_settings()
    provider_name = (provider or settings.default_provider).lower()

    if provider_name == "anthropic":
        model_name = "anthropic/claude-3-5-sonnet-20241022"
    elif provider_name == "openai":
        model_name = "openai/gpt-4o-mini"
    elif provider_name == "gemini":
        model_name = "gemini/gemini-1.5-flash"
    else:
        model_name = settings.default_model

    messages = [{"role": "user", "content": prompt}]
    if system_prompt:
        messages.insert(0, {"role": "system", "content": system_prompt})

    response = completion(
        model=model_name,
        messages=messages,
        api_key=token or "dev-token",
        api_base=settings.oidc_proxy_url,
    )

    content = response.choices[0].message.content
    return {
        "content": content,
        "provider": provider_name,
        "model": model_name,
    }
