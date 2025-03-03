# backend/app/models/cita.py
from pydantic import BaseModel
from datetime import datetime

class Cita(BaseModel):
    id: str = None  # Se asignará al guardar en Firebase
    paciente_id: str
    medico_id: str
    fecha: datetime
    hora: str
    motivo: str
    estado: str = "pendiente"  # Opciones: pendiente, confirmada, cancelada
