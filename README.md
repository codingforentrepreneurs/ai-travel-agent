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

### Official Code Repo on Github:
⦿ Profile: cfe.sh/github or github.com/codingforentrepreneurs

⦿ Project: https://github.com/codingforentrepreneurs/ai-travel-agent


### Services used
⦿ MariaDB: https://mariadb.com/

⦿ MindsDB: https://mindsdb.com/

⦿ Gretel: https://gretel.ai

⦿ OpenAI: https://openai.com/

⦿ AWS EC2: https://aws.amazon.com/ec2/

### Software used
⦿ MariaDB Docker Image: https://hub.docker.com/_/mariadb

⦿ Docker Engine: https://docs.docker.com/engine/

⦿ Python: https://www.python.org/

⦿ Node.js: https://nodejs.org/en

⦿ FastAPI: https://fastapi.tiangolo.com/

⦿ Next.js: https://nextjs.org/

⦿ Pandas: https://pandas.pydata.org/

⦿ Jupyter Notebooks: https://jupyter.org/

⦿ Pydandtic: https://docs.pydantic.dev/latest/

## Lesson Reference
Each Git branch corresponds to the start and end of a section when it makes sense to do so. For example, section 33 starts at Branch `33-start` and ends with branch `33-end`. These branches exist for your reference where main branch has the latest code.

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


## Create secrets with Python

```bash
python3 -c "import secrets;print(secrets.token_urlsafe(32))"
```


## Five Steps to Launch a Docker-based MariaDB Instance on AWS EC2

### Step 1 Create an AWS EC2 Instance. 
Ensure the security groups are setup correctly to allow port 3306 access for MariaDB.

### Step 2: Install Docker Compose
SSH into EC2 Instance with your private key and the `ubuntu` user:

```bash
ssh -i your-private-key.pem ubuntu@<your-ec2-instance-public-ip>
```
Once complete, install Docker Compose as written above.

### Step 3: Setup MariaDB Root User Password

On the EC2 instance create the `.env` add the following line with your own password:

```bash
MARIADB_ROOT_PASSWORD=your-secret-password
```

Such as:

```bash
echo "MARIADB_ROOT_PASSWORD=$(python3 -c 'import secrets;print(secrets.token_urlsafe(32))')" >> .env
```

### Step 4: Run MariaDB with Docker Compose

Copy the contents of [config/compose.yaml](./config/compose.yaml) file to your EC2 instance to run MariaDB with:
```bash
curl https://raw.githubusercontent.com/codingforentrepreneurs/ai-travel-agent/main/config/compose.yaml -o compose.yaml
docker compose -f compose.yaml up -d
```

### Step 5: Connection String to MariaDB
Make note of the EC2 instance public IP address so you can re-use it anywhere with the following database connection string:
```bash
mariadb://root:your-secret-password@<your-ec2-instance-public-ip>:3306
```



## YouTube Video Chapters

Link: [https://youtu.be/F5ZsLbBqWLU](https://youtu.be/F5ZsLbBqWLU)

- [00:00:00 Welcome](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=0s) 
- [00:03:34 Overview](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=214s)
- [00:07:59 References and Requirements](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=479s)
- [00:11:05 Provision EC2 Instance](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=665s)
- [00:16:58 Connect to EC2 Instance via SSH](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=1018s)
- [00:21:11 Install Docker on EC2 Instance](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=1271s)
- [00:23:35 Provision MariaDB wih Docker Compose](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=1415s)
- [00:34:04 Connect to EC2-Docker-based MariaDB Instance Locally](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=2044s)
- [00:40:55 Configure Virtual Environment and Jupyter](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=2455s)
- [00:47:54 Loading Dotenv with Python Decouple and Jupyter](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=2874s)
- [00:56:43 Connect to MariaDB via SQLAlchemy](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=3403s)
- [01:03:52 Load a Kaggle Dataset to MariaDB](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=3832s)
- [01:15:47 Create MariaDB User for MindsDB](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=4547s)
- [01:23:13 Integrate MariaDB & MindsDB](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=4993s)
- [01:31:31 Creating a Forecasting Model with MindsDB](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=5491s)
- [01:40:39 Predicting Future Values with MindsDB](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=6039s)
- [01:46:37 Load Flight Prices Dataset to MariaDB](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=6397s)
- [01:53:28 Prepare Flight Data for Predictions](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=6808s)
- [02:03:25 MindsDB Predictor for Flight Price Data](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=7405s)
- [02:08:09 More Data Features for Better Predictions](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=7689s)
- [02:17:21 SQLAlchemy Model from Database Table](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=8241s)
- [02:29:26 Pydantic Schema for SQLAlchemy Model](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=8966s)
- [02:34:05 SQLAlchemy Lookup Functions for Model Data](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=9245s)
- [02:39:04 MindsDB SQL Queries via Rest API and Python Part 1](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=9544s)
- [02:47:25 MindsDB SQL Queries via Rest API and Python Part 2](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=10045s)
- [02:59:34 FastAPI Backend App](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=10774s)
- [03:07:32 Why the FastAPI Backend](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=11252s)
- [03:10:16 Create the Next.js Frontend](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=11416s)
- [03:16:56 FastAPI CORS for Next.js](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=11816s)
- [03:26:26 Integrate MariaDB to FastAPI](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=12386s)
- [03:31:02 Listing Database Data via API View](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=12662s)
- [03:34:32 Detail View and Schema with FastAPI and Pydantic](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=12872s)
- [03:39:32 Listing API Data with Next.js](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=13172s)
- [03:44:37 Styling a Link with Tailwind](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=13477s)
- [03:46:44 Dynamic URL Route Detail Page in Next.js](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=13604s)
- [03:53:03 Next.js Layout & CSS Class](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=13983s)
- [03:58:17 Reusable Next.js Link Component](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=14297s)
- [04:03:09 Backend API Client in Next.js](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=14589s)
- [04:08:38 Handling request errors with swr and Next.js](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=14918s)
- [04:15:05 Next.js Form sending POST Requests to FastAPI](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=15305s)
- [04:23:43 MindsDB with FastAPI and Next.js](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=15823s)
- [04:30:23 Generate and Load Airport Data in MariaDB and FastAPI](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=16223s)
- [04:39:36 Airport Dropdown Selector](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=16776s)
- [04:45:32 Handling POST Data with FastAPI and Pydantic](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=17132s)
- [04:50:51 Prevent Duplicate Airports in Nextjs](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=17451s)
- [04:57:56 Improve Flight Price Prediction UI](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=17876s)
- [05:06:10 TailwindCSS Global Styles](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=18370s)
- [05:14:16 Form Styling with Flowbite References](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=18856s)
- [05:21:38 Prediction Results UI Table](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=19298s)
- [05:35:36 Integrate MindsDB with OpenAI to Make Flight Recommendations](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=20136s)
- [05:45:39 OpenAI Recommendation Response in UI](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=20739s)
- [05:56:28 Unique Request ID for Forecasts](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=21388s)
- [05:59:24 Recommendation Display](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=21564s)
- [06:05:47 Purchase Links](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=21947s)
- [06:10:08 Starting to Handle New Data](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=22208s)
- [06:11:51 Export Data and Train a Gretel Model](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=22311s)
- [06:16:49 Load Gretel Data to MariaDB via Pandas](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=22609s)
- [06:31:52 Train MindsDB Forecast Model via Jupyter](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=23512s)
- [06:43:07 Final Clean Up](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=24187s)
- [06:45:04 Thank you and your next challenge](https://www.youtube.com/watch?v=F5ZsLbBqWLU&t=24304s)
