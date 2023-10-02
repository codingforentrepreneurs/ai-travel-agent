SELECT * FROM ai_travel_agent.flight_prices ORDER BY flightDate DESC;

DROP MODEL flight_price_predictor;

CREATE MODEL mindsdb.flight_price_predictor_a
FROM ai_travel_agent (
  SELECT * FROM flight_prices
  )
PREDICT totalFare
ORDER BY flightDate
GROUP BY startingAirport, destinationAirport, isBasicEconomy, isRefundable, isNonStop, segmentsAirlineName
WINDOW 30
HORIZON 10;

DESCRIBE PREDICTOR mindsdb.flight_price_predictor_a;


SELECT * FROM mindsdb.flight_price_predictor AS m
JOIN ai_travel_agent.flight_prices  AS t
WHERE t.flightDate = "2022-04-21"
AND t.startingAirport = "SFO"
AND t.isNonStop = 1
AND t.destinationAirport = "BOS";

SELECT CONCAT(CAST(random() * 1000000 as INT)) as requestID, m.flightDate, m.totalFare, m.totalFare_confidence FROM mindsdb.flight_price_predictor AS m
    JOIN ai_travel_agent.flight_prices AS t
    WHERE t.flightDate = "2022-04-21"
    AND t.startingAirport = "JFK"
    AND t.isNonStop = 1
    AND t.isRefundable = 0
    AND t.isBasicEconomy = 0
    AND t.destinationAirport = "LAX";