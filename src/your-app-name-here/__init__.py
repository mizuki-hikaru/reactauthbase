from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from uvicorn import run
from authbase import setup_authbase, DEVELOPMENT, PRODUCTION
from sqlalchemy import create_engine
from pathlib import Path
from sys import argv

this_file_directory = Path(__file__).parent
mode = (DEVELOPMENT if (len(argv) == 2 and argv[1] == "dev") else PRODUCTION)

app = FastAPI()
engine = create_engine('sqlite:///your-app-name-here.db')
setup_authbase(app, engine, mode=mode)

# Your endpoints go here.

app.mount("/", StaticFiles(directory=str(this_file_directory / "dist"), html=True), name="static")

def main():
    run("your-app-name:app", host="127.0.0.1", port=8000, reload=True)
