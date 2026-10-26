from fastapi import FastAPI

from app.api.routes.chat import router as chat_router

app = FastAPI(title="Onix Backend", version="0.1.0")

app.include_router(chat_router)


@app.get("/health")
def health() -> dict:
    return {"ok": True, "service": "onix-backend"}
