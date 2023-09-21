SELECT * FROM housing_prices_conn.kaggle_house_data ORDER BY date DESC;

SELECT m.date as future_date, m.price as forecast, price_confidence FROM mindsdb.house_sales_predictor_two_years AS m
JOIN housing_prices_conn.kaggle_house_data AS t
WHERE t.date > LATEST
AND t.type = "house"
AND t.bedrooms = 3;