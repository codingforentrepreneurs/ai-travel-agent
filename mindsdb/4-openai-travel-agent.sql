CREATE MODEL ai_travel_agent
PREDICT answer
USING
    engine = 'openai',
    api_key = '',
    question_column = 'question',
    context_column = 'context';

SELECT answer
FROM ai_travel_agent
WHERE question="What is bigger a or b"
AND context="b is 10 and a is 1";|