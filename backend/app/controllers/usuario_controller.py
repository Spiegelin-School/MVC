# backend/app/controllers/usuario_controller.py
from fastapi import APIRouter, HTTPException
from app.models.usuario import Usuario
from app.dao.firebase_dao import crear_usuario, obtener_usuarios

router = APIRouter()

@router.post("/usuarios", response_model=Usuario)
def crear_usuario_endpoint(usuario: Usuario):
    usuario_creado = crear_usuario(usuario.dict())
    if not usuario_creado:
        raise HTTPException(status_code=400, detail="Error al crear el usuario")
    return usuario_creado

@router.get("/usuarios")
def listar_usuarios():
    usuarios = obtener_usuarios()
    return usuarios
