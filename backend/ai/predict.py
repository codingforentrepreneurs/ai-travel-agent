MINDSDB_BASE_URL = "https://cloud.mindsdb.com/api"


def mindsdb_query(session, sql_query):
    endpoint = "/sql/query"
    url = f"{MINDSDB_BASE_URL}{endpoint}"
    headers = {"Content-Type": "application/json"}
    return session.post(url, json={"query": sql_query}, headers=headers)


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
    SELECT m.flightDate as date, m.segmentsAirlineName as airline, m.isNonStop as nonStop, m.isBasicEconomy as basic, m.isRefundable as refundable, m.totalFare as price FROM mindsdb.flight_price_predictor AS m
    JOIN ai_travel_agent.flight_prices AS t
    WHERE t.flightDate >= "{flightDate}"
    AND t.startingAirport = "{startingAirport}"
    AND t.isBasicEconomy = "{isBasicEconomy}"
    AND t.isRefundable = "{isRefundable}"
    AND t.isNonStop = {isNonStop}
    AND t.destinationAirport = "{destinationAirport}"
    LIMIT 10;
    """
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