from pydantic import BaseModel, Field
from datetime import date

class AirportSchema(BaseModel): # pydantic
    name: str = Field(alias="label")
    iata: str = Field(alias="value")

    class Config:
        populate_by_name = True
        from_attributes = True

class PredictSchema(BaseModel): # pydantic
    startingAirport: str
    destinationAirport: str
    flightDate: date = "2022-04-21"
    isBasicEconomy: bool = False
    isRefundable: bool = False
    isNonStop: bool = True

    # class Config:
    #     from_attributes = True    


class FlightPriceSchema(BaseModel): # pydantic
    id: int 
    flightDate: date
    startingAirport: str
    destinationAirport: str
    # isBasicEconomy: bool
    # isRefundable: bool
    # isNonStop: bool
    segmentsAirlineName: str
    totalFare: int

    class Config:
        from_attributes = True


class FlightPriceDetailSchema(BaseModel): # pydantic
    id: int 
    flightDate: date
    startingAirport: str
    destinationAirport: str
    isBasicEconomy: bool
    isRefundable: bool
    isNonStop: bool
    segmentsAirlineName: str
    totalFare: int

    class Config:
        from_attributes = True