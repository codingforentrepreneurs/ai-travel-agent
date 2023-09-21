# AI Travel Agent with MariaDB, FastAPI, Next.js, & MindsDB


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