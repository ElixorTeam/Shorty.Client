# Quick Start Guide

This guide will help you quickly set up and run the project using either Node.js with Bun or Docker. Follow the steps below based on your preferred setup.

---

## Option 1: Running with Node.js and Bun

1. Download and install the latest version of [Node.js](https://nodejs.org/en/download/) (LTS recommended).
2. Install bun

```bash
npm i -g bun
```

3. Start the Application

```bash
bun run dev
```

- This will start the app in development mode.
- Open `http://localhost:3000` in your browser to view the app.

## Option 2: Running with Docker

1. Download [Docker](https://www.docker.com/) for your operating system.
2. Verify that Docker is installed correctly:

```bash
docker --version
```

3. Create a copy of .env.example and rename it to .env. Then fill in the required environment variables.
4. Start docker compose

```bash
docker compose up
```

- This will start the app in production mode.
- Open `http://localhost:3000` in your browser to view the app.

[Go back](README.md)
