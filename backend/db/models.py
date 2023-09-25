from sqlalchemy import Column, BigInteger, Date, Integer, String, Boolean
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

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