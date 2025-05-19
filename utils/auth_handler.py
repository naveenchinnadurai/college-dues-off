import time
import jwt
from typing import Dict
from dotenv import load_dotenv
import os

load_dotenv()

JWT_SECRET = os.getenv("secret")
JWT_ALGORITHM = os.getenv("algorithm")

def validate_env_config():
    if not JWT_SECRET:
        raise ValueError("JWT_SECRET must be set in environment variables")
    if not JWT_ALGORITHM:
        raise ValueError("JWT_ALGORITHM must be set in environment variables")

def token_response(token: str):
    return{
        "access token": token,
        "token_type": "bearer"
    }

def signJWT(userID: str)-> Dict[str,str]:
    payload = {
        "UserID": userID,
        "expiry":time.time() + 1800 #seconds
    }
    try:
        token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
        return token_response(token)
    except Exception as e:
        raise ValueError(f"Error generating token: {str(e)}")


def decodeJWT(token: str):
    try:
        decode_token = jwt.decode(token, JWT_SECRET, JWT_ALGORITHM)
        return decode_token if decode_token['expiry'] >= time.time() else None
    except:
        raise ValueError("Invalid Token")