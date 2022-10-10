# Logbook Anywhere ✈️

Web based flight logbook solution. Currently in initial version, which allows user registration, authentication and flight logging.

### Tech stack

Running on Docker and Docker-compose

-   Backend - Node.js Express Framework 🏎️
-   Frontend - Vue 3 🖖, Sass 🖌️
-   Database - MongoDB 🥭 🍃

### Local development setup 101

1. Make sure you are in the repo's root directory
2. Either run `MONGO_DB_USER=username MONGO_DB_PASS=password MONGO_DB_CLUSTER=clusterName docker compose up -d`, and make sure to replace `username`, `password` and `clusterName` with your corresponding MongoDB credentials.
   <br>
   **OR**
   <br>
   Open `docker-compose.yml` and in the `backend` service part edit the environment variables to match your MongoDB credentials, then run `docker-compose up -d`

### Assets used

All assets used are under Creative Commons license
