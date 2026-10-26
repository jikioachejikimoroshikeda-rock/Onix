from dataclasses import dataclass
import os
from functools import lru_cache


@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "onix")
    api_host: str = os.getenv("API_HOST", "0.0.0.0")
    api_port: int = int(os.getenv("API_PORT", "8000"))
    default_model: str = os.getenv("DEFAULT_MODEL", "anthropic/claude-3-5-sonnet-20241022")
    default_provider: str = os.getenv("DEFAULT_PROVIDER", "anthropic")
    oidc_proxy_url: str = os.getenv("OIDC_PROXY_URL", "http://localhost:8787")


@lru_cache

def get_settings() -> Settings:
    return Settings()
