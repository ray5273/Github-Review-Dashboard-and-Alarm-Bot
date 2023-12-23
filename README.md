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

### How to run

1. How to run the crawler

```bash
ts-node github-crawler/src/index.ts
```

2. How to run the api-server

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
    
