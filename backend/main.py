from typing import List
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from requests import Session as RequestsSession

from backend.env import config
from backend.ai import predict
from backend.ai.connect import get_mindsdb_session

from backend.db.connect import get_db_session, SessionLocal
from backend.db.schemas import FlightPriceSchema, FlightPriceDetailSchema
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

@app.post("/predict")
def write_to_predict(ai_session: RequestsSession = Depends(get_mindsdb_session)):
    predictions = predict.predict_query(
        ai_session,
        flightDate = "2022-04-21", 
        startingAirport="SFO", 
        isNonStop=1, 
        destinationAirport="BOS",
    )
    return {
        "predictions": predictions,
    }


@app.get("/flights/", response_model=List[FlightPriceSchema])
def read_flight_prices(offset:int=0, limit:int=100, db_session: SessionLocal = Depends(get_db_session)):
    return db_utils.get_flight_prices(db_session, offset=offset, limit=limit)


@app.get("/flights/{flight_price}", response_model=FlightPriceDetailSchema)
def read_flight_prices(flight_price:int, db_session: SessionLocal = Depends(get_db_session)):
    db_flight_value = db_utils.get_flight_price(db_session, flight_price)
    if db_flight_value is None:
        raise HTTPException(status_code=404, detail='Flight Price not Found')
    return db_flight_value