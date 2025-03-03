from fastapi import APIRouter, HTTPException, Depends
from app.models.auth import Register, Login
from app.dao.firebase_dao import crear_usuario, obtener_usuario_por_correo
from firebase_admin import auth

router = APIRouter()

@router.post("/register")
def register(register_data: Register):
    # Verifica si el usuario ya existe por correo
    existing_user = obtener_usuario_por_correo(register_data.correo)
    if existing_user:
        raise HTTPException(status_code=400, detail="El usuario ya existe")

    user_data = register_data.dict()
    usuario_creado = crear_usuario(user_data)
    return usuario_creado

@router.post("/login")
def login(data: dict):
    """
    Verifica el ID Token de Firebase en lugar de la contraseña.
    """
    try:
        decoded_token = auth.verify_id_token(data["id_token"])
        uid = decoded_token["uid"]
        email = decoded_token["email"]

        return {"message": "Login exitoso", "user": {"uid": uid, "email": email}}

    except Exception as e:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
