from backend.db.models import Airport, FlightPrice

def get_airports(session, offset=0, limit=100):
    return session.query(Airport).offset(offset).limit(limit).all()

def get_flight_prices(session, offset=0, limit=100):
    return session.query(FlightPrice).offset(offset).limit(limit).all()

def get_flight_price(session, flight_price_id):
    return session.query(FlightPrice).filter(FlightPrice.id == flight_price_id).one_or_none()