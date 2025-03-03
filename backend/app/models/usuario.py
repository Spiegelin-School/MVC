# backend/app/models/usuario.py
from pydantic import BaseModel
from enum import Enum

class RolUsuario(str, Enum):
    administrador = "Administrador"
    medico = "Medico"
    paciente = "Paciente"
    enfermera = "Enfermera"

class Usuario(BaseModel):
    id: str = None  # Se asignará al guardar en Firebase
    nombre: str
    rol: RolUsuario

# Clases hijas, que pueden extender atributos específicos
class Administrador(Usuario):
    rol: RolUsuario = RolUsuario.administrador

class Medico(Usuario):
    rol: RolUsuario = RolUsuario.medico
    especialidad: str = None  # Opcional, puede ser útil para filtrar médicos

class Paciente(Usuario):
    rol: RolUsuario = RolUsuario.paciente
    historia_clinica: str = None  # Opcional, para almacenar información médica

class Enfermera(Usuario):
    rol: RolUsuario = RolUsuario.enfermera
    turno: str = None  # Opcional, para definir el turno de la enfermera
