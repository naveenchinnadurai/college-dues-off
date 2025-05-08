from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .auth_handler import decodeJWT

class JWTBearer(HTTPBearer):
    def __init__(self, auto_error:bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        if 'Authorization' not in request.headers:
            raise HTTPException(
                status_code=401, 
                detail="Missing authentication header"
            )
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="invalid token or expired")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code")
    def verify_jwt(self, jwtoken: str):
        try:
            payload = decodeJWT(jwtoken)
            return payload is not None
        except Exception:
            return False