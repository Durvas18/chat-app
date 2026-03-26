# 💬 Real-time Chat App — AWS EC2 Deployment Guide

## Project Structure
```
chat-app/
├── server.js                      # Express + Socket.io backend
├── public/index.html              # Frontend (plain HTML/CSS/JS)
├── package.json
├── Dockerfile
└── .github/workflows/deploy.yml   # CI/CD pipeline
```

---

## 🚀 Step-by-Step AWS EC2 Deployment

### Step 1 — Launch an EC2 Instance
1. Go to AWS Console → EC2 → Launch Instance
2. Choose **Ubuntu 22.04 LTS** (free tier eligible)
3. Instance type: **t2.micro** (free tier)
4. Create or select a **Key Pair** (.pem file) — save it safely
5. Security Group — allow inbound:
   - SSH: port 22
   - HTTP: port 80
   - Custom TCP: port 3000

### Step 2 — Connect to EC2 & Install Docker
```bash
# Connect via SSH
ssh -i your-key.pem ubuntu@<your-ec2-public-ip>

# Install Docker
sudo apt update && sudo apt install -y docker.io git
sudo systemctl start docker
sudo usermod -aG docker ubuntu
newgrp docker
```

### Step 3 — Clone & Run the App
```bash
git clone https://github.com/YOUR_USERNAME/chat-app.git
cd chat-app
docker build -t chat-app .
docker run -d --name chat-app --restart always -p 3000:3000 chat-app
```

Visit: `http://<your-ec2-public-ip>:3000`

---

## 🔁 CI/CD with GitHub Actions (Auto Deploy on Push)

### Step 4 — Add GitHub Secrets
Go to your repo → Settings → Secrets → Actions → New secret:

| Secret Name | Value |
|---|---|
| `EC2_HOST` | Your EC2 public IP |
| `EC2_USER` | `ubuntu` |
| `EC2_KEY` | Content of your `.pem` file |

Now every `git push` to `main` auto-deploys to EC2! ✅

---

## 🧪 Run Locally
```bash
npm install
npm start
# Open http://localhost:3000
```

## 🧪 Run with Docker Locally
```bash
docker build -t chat-app .
docker run -p 3000:3000 chat-app
```

---

## ✨ Features
- Real-time messaging with Socket.io
- Join with a username
- Typing indicators
- Online user count
- System messages (join/leave)
- Clean dark UI
