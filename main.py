from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import auth_route
from routes.staff_routes import staff_route
from routes.student_routes import student_route
from routes.profile_routes import profile_route
from db.database import engine
from fastapi.responses import JSONResponse
import uvicorn
import pandas as pd
from io import BytesIO

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def index():
    return {"message": "Hello Guys to Backend"}

app.include_router(profile_route)
app.include_router(auth_route)
app.include_router(staff_route)
app.include_router(student_route)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
