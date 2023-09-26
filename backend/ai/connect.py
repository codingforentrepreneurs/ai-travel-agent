from backend.env import config
import requests
MINDSDB_UN=config("MINDSDB_UN", default=None)# martyna@mindsdb.com
MINDSDB_PW=config("MINDSDB_PW", default=None) # xxxxxxxx

def init_mindsdb_session():
    session = requests.Session()
    session.post('https://cloud.mindsdb.com/cloud/login', json={
        'email': MINDSDB_UN,
        'password': MINDSDB_PW
    })
    return session

def get_mindsdb_session():
    session = init_mindsdb_session()
    try:
        yield session
    finally:
        session.close()