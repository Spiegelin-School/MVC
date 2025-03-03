from app.core.firebase_config import db, auth

def crear_cita(cita_data: dict) -> dict:
    doc_ref = db.collection("citas").document()
    cita_data['id'] = doc_ref.id
    doc_ref.set(cita_data)
    return cita_data

def obtener_citas() -> list:
    citas_ref = db.collection("citas").stream()
    citas = [doc.to_dict() for doc in citas_ref]
    return citas

# Funciones para usuarios
def crear_usuario(usuario_data: dict) -> dict:
    doc_ref = db.collection("usuarios").document()
    usuario_data['id'] = doc_ref.id
    doc_ref.set(usuario_data)
    return usuario_data

def obtener_usuarios() -> list:
    usuarios_ref = db.collection("usuarios").stream()
    usuarios = [doc.to_dict() for doc in usuarios_ref]
    return usuarios


def crear_usuario(user_data: dict) -> dict:
    """
    Crea un usuario en Firebase Authentication y Firestore.
    Firebase Auth maneja el hash y la seguridad de la contraseña automáticamente.
    """
    try:
        user_record = auth.create_user(
            email=user_data["correo"],
            password=user_data["contrasena"],
            display_name=user_data["usuario"]
        )

        # Guardar información adicional en Firestore
        usuario_data = {
            "correo": user_data["correo"],
            "usuario": user_data["usuario"],
            "rol": user_data["rol"],
            "uid": user_record.uid  # Guardamos el UID de Firebase Auth
        }
        db.collection("usuarios").document(user_record.uid).set(usuario_data)
        return usuario_data

    except Exception as e:
        raise ValueError(f"Error al crear usuario: {str(e)}")
    

def obtener_usuario_por_correo(correo: str):
    """
    Obtiene un usuario desde Firestore según el correo.
    """
    users_ref = db.collection("usuarios")
    query = users_ref.where("correo", "==", correo).stream()
    users = [doc.to_dict() for doc in query]
    return users[0] if users else None
