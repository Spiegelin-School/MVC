# backend/app/core/firebase_config.py
import firebase_admin
from firebase_admin import credentials, firestore, auth
import os
from dotenv import load_dotenv
# Load environment variables
load_dotenv()

# Read Firebase credentials from .env
firebase_credentials = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY_PATH")

# Ruta al archivo de credenciales de Firebase
cred = credentials.Certificate(firebase_credentials)
firebase_admin.initialize_app(cred)

db = firestore.client()