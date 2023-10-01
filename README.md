# AI Travel Agent with MariaDB, FastAPI, Next.js, & MindsDB

Transform a dataset into a predictive AI model that recommends the best flight based on the route selected.

Topics covered:
- Using AWS EC2, deploy Docker-based MariaDB Instance
- Aggregate Kaggle-based dataset via Python Pandas
- Load a dataset via Pandas and Jupyter to MariaDB
- Connect MariaDB to MindsDB
- Train two forecasting models within MindsDB
    - housing prices
    - flight prices
- Use SQL to run predictions in MindsDB Console
- Connect MariaDB with FastAPI, SQLAlchemy, and Pydantic
- Connect FastAPI to NextJS
- Build forms and routes with Next.js and App Router
- Craft UI elements with TailwindCSS and Flowbite
- Build Reusable Airport-select React/Next Client Component
- Connect FastAPI to MindsDB for SQL via Rest API
- Generate Synthetic Data with Gretel.ai

## References

- Github Repo:
    - github.com/codingforentrepreneurs
    - cfe.sh/github
    - https://github.com/codingforentrepreneurs/ai-travel-agent
- mariadb: https://mariadb.com/
- mariadb docker: https://hub.docker.com/_/mariadb
- mindsdb: https://mindsdb.com/
- gretel.ai: https://gretel.ai
- FastAPI: https://fastapi.tiangolo.com/
- Next.js: https://nextjs.org/
- Pandas: https://pandas.pydata.org/
- Jupyter Notebooks: https://jupyter.org/


## Install Docker & Docker Compose

Enter you EC2 Instance
```
ssh -i your-private-key.pem ubuntu@<your-ec2-instance-public-ip>
```

Escalate to Root
```
sudo su
```

Install Docker
```
curl -fsSL https://get.docker.com | sudo sh
```


## create secrets

```bash
python3 -c "import secrets;print(secrets.token_urlsafe(32))"
```