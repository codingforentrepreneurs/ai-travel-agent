from typing import List
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from backend.env import config
from backend.db.connect import get_db_session, SessionLocal
from backend.db.schemas import FlightPriceSchema
from backend.db import utils as db_utils

DEBUG = config("DEBUG", cast=bool, default=False)
FRONTEND_ORIGINS = config("FRONTEND_ORIGINS", cast=lambda x: [s.strip() for s in x.split(",")], default="")


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello-world")
def read_hello_world():
    return {
        "hello": "world",
        "Debug": DEBUG,
    }

@app.post("/hello-world")
def write_hello_world():
    return {
        "hello": "world",
        "Debug": DEBUG,
    }


@app.get("/flights/", response_model=List[FlightPriceSchema])
def read_flight_prices(db_session: SessionLocal = Depends(get_db_session)):
    return db_utils.get_flight_prices(db_session)