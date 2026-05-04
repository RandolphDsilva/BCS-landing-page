"""
Minimal FastAPI server for the Bombay Catholic Sabha site.

The landing page reads sponsor data directly from Supabase (client-side with
the anon key + RLS). This backend is intentionally thin and only exposes a
health endpoint so the supervisor stays green.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Bombay Catholic Sabha API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "bcs-api"}


@app.get("/api/")
async def root():
    return {"message": "Bombay Catholic Sabha API"}
