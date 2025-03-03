# backend/app/models/auth.py
from pydantic import BaseModel
from app.models.usuario import RolUsuario

class Register(BaseModel):
    correo: str
    usuario: str
    contrasena: str
    rol: RolUsuario

class Login(BaseModel):
    correo: str
    contrasena: str
