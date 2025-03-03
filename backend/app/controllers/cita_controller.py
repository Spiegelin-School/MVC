# backend/app/controllers/cita_controller.py
from fastapi import APIRouter
from app.models.cita import Cita
from app.dao.firebase_dao import crear_cita, obtener_citas

router = APIRouter()

@router.post("/citas", response_model=Cita)
def crear_cita_endpoint(cita: Cita):
    cita_creada = crear_cita(cita.dict())
    return cita_creada

@router.get("/citas")
def listar_citas():
    return obtener_citas()
