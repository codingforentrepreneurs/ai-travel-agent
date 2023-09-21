SELECT * FROM housing_prices_conn.kaggle_house_data ORDER BY date;

CREATE MODEL mindsdb.house_sales_predictor
FROM housing_prices_conn (
  SELECT * FROM kaggle_house_data
  )
PREDICT price
ORDER BY date
GROUP BY type, bedrooms
WINDOW 8
HORIZON 4;

DESCRIBE PREDICTOR mindsdb.house_sales_predictor;

CREATE MODEL mindsdb.house_sales_predictor_two_years
FROM housing_prices_conn (
  SELECT * FROM kaggle_house_data
  )
PREDICT price
ORDER BY date
GROUP BY type, bedrooms
WINDOW 12
HORIZON 8;

DESCRIBE PREDICTOR mindsdb.house_sales_predictor_two_years;