# Github Review Dashboard

## Overview

### Review Dashboard Example

Review Dashboard for individual
![image](https://github.com/ray5273/Github-Review-Dashboard-and-Alarm-Bot/assets/8529112/9747d0da-d205-42ff-8d7c-5fe17d9adb61)


Review Dashboard for teams
![image](https://github.com/ray5273/Github-Review-Dashboard-and-Alarm-Bot/assets/8529112/b5abad27-e4f4-4178-847e-2647e237fea3)


### Review Dashboard Structure

```text
├── README.md 
├── api-server 
│ ├── controller 
│ ├── routes 
│ ├── app.ts (Express application setup) 
│ ├── server.ts (Server startup script) 
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

- [Node.js](https://nodejs.org/en/) 
- [npm](https://www.npmjs.com/) 
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/) (15.3)

## Programs

1. [Crawler](#1-run-the-crawler)
2. [API Server](#2-run-the-api-server)

## How to run

### 0. Add the following environment variables to the `.env` file in the root directory.

- GITHUB_TOKEN: Github token to access the Github API
- POSTGRES_USER: Postgres user name
- POSTGRES_PASSWORD: Postgres password
- POSTGRES_DB: Postgres database name
- POSTGRES_HOST: Postgres host

```bash
GITHUB_TOKEN=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=
````

### 1. Run the crawler

```bash
ts-node github-crawler/src/index.ts
```

### 2. Run the api-server

API server will run on port 8080 by default.

```bash
ts-node api-server/src/server.ts
```

## Plan

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
- [ ] Create an admin page to manage the data
  - Newly added Users
  - Newly added Repositories
    
