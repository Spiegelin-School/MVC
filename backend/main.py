# backend/main.py
# uvicorn main:app --reload --host 0.0.0.0 --port 8000
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import cita_controller, usuario_controller, auth_controller

app = FastAPI(title="Sistema de Agendamiento de Citas en Hospital")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cita_controller.router, prefix="/api")
app.include_router(usuario_controller.router, prefix="/api")
app.include_router(auth_controller.router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
