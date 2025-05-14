# 📝 Todo Application

This is a full-stack **Todo Application** built with modern technologies including PostgreSQL, Prisma, React, Node.js, and Docker. The project is fully containerized using Docker Compose and supports **hot reload in the frontend** for a seamless development experience.

---

## 🚀 Tech Stack

| Layer            | Technology                                                                             |
| ---------------- | -------------------------------------------------------------------------------------- |
| Frontend         | [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)                            |
| Backend          | [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)                     |
| Database         | [PostgreSQL](https://www.postgresql.org/)                                              |
| ORM              | [Prisma](https://www.prisma.io/)                                                       |
| Containerization | [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/) |
| Dev Experience   | Hot Reload via Vite volume mounting and polling                                        |

---

## ✨ Features

- ✅ Create, update, delete todo items
- 📦 Persistent data storage using PostgreSQL
- 🧠 Type-safe queries with Prisma ORM
- 📡 REST API with Express
- 🐳 Dockerized frontend and backend
- 🔁 Hot reload in development for the React frontend

---

## 🛠️ Getting Started

### Prerequisites

- Docker
- Docker Compose

### Setup

1. Clone the repository:

```bash
git clone https://github.com/Prafullsingh975/docker-todo.git
cd docker-todo
```

### Run frontend

```bash
cd client
docker compose up --build
```

### Run backend

```bash
cd server
docker compose up --build
```
