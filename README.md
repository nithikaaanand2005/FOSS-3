Here’s a clean and corrected **README.md** you can use for your project:

---

# Redis Notifications

A simple notification system using **Node.js**, **Express**, **Socket.io**, and **Redis**.

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install express redis socket.io
```

### 2. Start Redis Server

```bash
sudo service redis-server start
```

### 3. Check Redis Connection

```bash
redis-cli ping
```

Expected output:

```
PONG
```

---

## 🧠 Running the Server

```bash
node server.js
```

Once running, you should see:

```
Server running on port 3000
Connected to local Redis
Redis subscriber connected.
```

---

## 🌐 Access the App

Open your browser and visit:

```
http://localhost:3000
```

---

## 🔔 Trigger a Notification

If you’re using **WSL** (Windows Subsystem for Linux), first find your Windows IP:

```bash
ip route | grep default
```

Example output:

```
default via 172.30.96.1 dev eth0 proto kernel
```

Then trigger a notification using that IP:

```bash
curl -X POST http://172.30.96.1:3000/like/Alice
```

If you’re running everything directly on Windows, you can use:

```bash
curl -X POST http://localhost:3000/like/Alice
```

---


