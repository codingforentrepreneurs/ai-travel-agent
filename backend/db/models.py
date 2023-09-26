from sqlalchemy import Column, BigInteger, Date, Integer, String, Boolean, Float
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class Airport(Base):
    __tablename__ = "airports"
    __table_args__ = {"extend_existing": True}
    id = Column("index", BigInteger, primary_key=True)
    name = Column(String)
    icao = Column(String)
    iata = Column(String)
    city = Column(String)
    subd = Column(String)
    country= Column(String)
    elevation = Column(Float)
    lat = Column(Float)
    lon = Column(Float)
    tz = Column(String)
    lid = Column(String)

class FlightPrice(Base):
    __tablename__ = "flight_prices"
    __table_args__ = {"extend_existing": True}
    id = Column("index", BigInteger, primary_key=True)
    flightDate = Column(Date)
    startingAirport = Column(String)
    destinationAirport = Column(String)
    isBasicEconomy = Column(Boolean)
    isRefundable = Column(Boolean)
    isNonStop = Column(Boolean)
    segmentsAirlineName = Column(String)
    totalFare = Column(Integer)