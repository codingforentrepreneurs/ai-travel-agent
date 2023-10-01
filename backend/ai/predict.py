from backend.env import config 
import json
MINDSDB_BASE_URL = "https://cloud.mindsdb.com/api"

FLIGHT_PRICE_PREDICTOR_MODEL = config("FLIGHT_PRICE_PREDICTOR_MODEL", default='flight_price_predictor')

def mindsdb_query(session, sql_query):
    endpoint = "/sql/query"
    url = f"{MINDSDB_BASE_URL}{endpoint}"
    headers = {"Content-Type": "application/json"}
    return session.post(url, json={"query": sql_query}, headers=headers)


def recommended_flight(session, 
        user_data = {},
        forecast_data = [],
        question="Respond with JSON only, what is the best flight option?",
        raw_request=False,
        **kwargs,
        ):
    context = {"options": forecast_data, "preferences": user_data}
    context_data = json.dumps(context)
    sql_query = f"""SELECT answer
    FROM ai_travel_agent
    WHERE question='{question}'
    AND context='{context_data}';
    """
    response = mindsdb_query(session, sql_query)
    response.raise_for_status()
    if raw_request:
        return response
    data = response.json()
    dataset = data.get('data')
    if dataset is None or data is None:
        return []
    if isinstance(dataset, list):
        sub_dataset = dataset[0]
        if isinstance(sub_dataset, list):
            json_data = sub_dataset[0]
            try:
                return json.loads(json_data)
            except:
                pass 
            return sub_dataset[0]
        return sub_dataset
    return dataset

def predict_query(session, 
        flightDate = "2022-04-21", 
        startingAirport="SFO", 
        isNonStop=1, 
        isBasicEconomy=0,
        isRefundable=0,
        destinationAirport="BOS",
        raw_request=False,
        **kwargs,
        ):
    sql_query = f"""
    SELECT CONCAT(CAST(random() * 1000000 as INT)) as requestID, m.flightDate as date, m.segmentsAirlineName as airline, m.isNonStop as nonStop, m.isBasicEconomy as basic, m.isRefundable as refundable, m.totalFare as price FROM mindsdb.{FLIGHT_PRICE_PREDICTOR_MODEL} AS m
    JOIN ai_travel_agent.flight_prices AS t
    WHERE t.flightDate >= "{flightDate}"
    AND t.startingAirport = "{startingAirport}"
    AND t.isBasicEconomy = "{isBasicEconomy}"
    AND t.isRefundable = "{isRefundable}"
    AND t.isNonStop = {isNonStop}
    AND t.destinationAirport = "{destinationAirport}"
    LIMIT 5;
    """
    print(sql_query)
    response = mindsdb_query(session, sql_query)
    response.raise_for_status()
    if raw_request:
        return response
    data = response.json()
    columns = data.get("column_names")
    dataset = data.get('data')
    if dataset is None or data is None:
        return []
    web_ready_data = [dict(zip(columns, row)) for row in dataset]
    return web_ready_data