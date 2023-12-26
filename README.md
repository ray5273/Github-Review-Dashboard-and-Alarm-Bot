# Github Review Dashboard

## Overview

### Review Dashboard Example

Review Dashboard for individual
![image](https://github.com/ray5273/Github-Review-Dashboard-and-Alarm-Bot/assets/8529112/9747d0da-d205-42ff-8d7c-5fe17d9adb61)


Review Dashboard for teams
![image](https://github.com/ray5273/Github-Review-Dashboard-and-Alarm-Bot/assets/8529112/b5abad27-e4f4-4178-847e-2647e237fea3)


Admin Page Example : Repository Data
<img width="1126" alt="image" src="https://github.com/ray5273/Github-Review-Dashboard-and-Alarm-Bot/assets/8529112/d76741a4-84c1-4682-8cfb-477b4cc6132a">

Admin Page Example : User Data
<img width="1134" alt="image" src="https://github.com/ray5273/Github-Review-Dashboard-and-Alarm-Bot/assets/8529112/1e030934-5ef0-4cb3-9b8c-43b16ef09817">



### Review Dashboard Structure

```text
├── README.md 
├── api-server 
│ ├── controller 
│ ├── routes 
│ ├── app.ts (Express application setup) 
│ ├── server.ts (Server startup script) 
├── frontend
│ ├── App.tsx (React application setup)
│ ├── index.tsx (React application startup script)
│ ├── components
├── github-crawler
│ ├── index.ts (Crawler startup script)
│ ├── githubRestAPIRequest.ts (Github Rest API Request) 
├── shared 
│ ├── db 
│ │ ├── entity 
│ │ ├── service 
│ ├── database.ts (Database setup)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>= 20.9.0)
- [npm](https://www.npmjs.com/) (>= 10.1.0)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/) (15.3)
- [Podman](https://podman.io/) (>= 4.7.2)
- Podman-Compose (1.0.6)
- [Grafana](https://grafana.com/) (10.0.0)

## Programs

1. [Crawler](#1-run-the-crawler)
2. [API Server](#2-run-the-api-server)
3. [Frontend](#3-run-the-frontend-server)

## How to run


## installation and setup

Make sure you have installed the prerequisites.    

### 1. clone the repository and install the dependencies
```bash
git clone https://github.com/ray5273/Github-Review-Dashboard-and-Alarm-Bot
npm install
```

### 2. Start the database

```bash
cd db_deploy
podman-compose build 
podman-compose up -d
```

### 3. Start the Grafana

```bash
cd dashboard_deploy
podman-compose build
podman-compose up -d
```


### 4. Add the following environment variables to the `.env` file in the root directory.

- GITHUB_TOKEN: Github token to access the Github API
- POSTGRES_USER: Postgres user name
- POSTGRES_PASSWORD: Postgres password
- POSTGRES_DB: Postgres database name
- POSTGRES_HOST: Postgres host
- HTTP_PROXY: HTTP proxy for the company network (optional)

```bash
GITHUB_TOKEN=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=
HTTPS_PROXY=
````

## Run the programs

### 1. Run the crawler

```bash
ts-node github-crawler/src/index.ts
```

### 2. Run the api-server

API server will run on port 8080 by default.

```bash
ts-node api-server/src/server.ts
```

### 3. Run the Frontend server

Frontend server will run on port 3000 by default. 

**But you must set the port environment variable to 8081.**
which is defined in the `.env` file in the frontend directory.

```bash
cd frontend
npm install
npm start
```

## Plans

- [x] Create a new project
- [x] Create a crawler to get the data from Github with the following information:
  - [x] PRs
  - [x] Reviews
  - [x] Comments
- [x] Create a dashboard to show the data
  - [x] Select the dashboard framework or library
  - [x] PRs
  - [x] Reviews
  - [x] Comments
- [x] Create an admin page to manage the data
  - [x] Newly added Users
  - [x] Newly added Repositories
  - [x] Delete Users
  - [x] Delete Repositories
    
