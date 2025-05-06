# Fetch Users SPA x Field Sync Interview Assessment

A full stack application with React frontend, Node.js API, and PostgreSQL database.

Working example can be found here:
- [Frontend app](https://app.emmettscully.com)
- [API](https://emmettscully.com)

1. The HOME page is used to GET the initial users from https://jsonplaceholder.typicode.com/users
2. The SAVE page is used to POST the data from the jsonplaceholder site to our DB via API endpoint
3. The FETCH page is used to GET the data from the DB via API endpoint
4. The CESIUM page is used to show a basic implementation of cesium with react and load a basic 3d tile scene

** ALSO **
- Add new individual users on the FETCH page after fetching
- Delete individual users on the FETCH page after fetching

## Project Structure

- `frontend/`: React application
- `api/`: Node.js Express API
- `database/`: PostgreSQL database initialization scripts
- `docker-compose.yml`: Docker Compose configuration for the backend services

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Docker and Docker Compose


## Setup and Running

Follow these steps to run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fullstack-users-app.git
cd fullstack-users-app
```

### 2. Start Backend Services (API & Database)

```bash
# From the project root directory
docker-compose up -d
```

This will:
- Create and start the PostgreSQL database container
- Create and start the Node.js API container
- Initialize the database with the required schema

** This repo contains the hardcoded DB and API endpoints (it's just a dev env for fun) but you will need to change these to localhost and DB options to:
```
  const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'users_db',
});
```
when you run it locally
**

### 3. Verify Backend Services

```bash
# Check if containers are running
docker-compose ps

# Check API is accessible
curl http://localhost:3001
```

### 4. Start Frontend Application

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend application will be available at http://localhost:3000

### 5. Using the Application

1. **Home Page**: Click the "Download" button to fetch users from the external API
2. **Save Page**: Click the "Save" button to store the downloaded users in the database
3. **Fetch Page**: Click the "Fetch" button to retrieve users from the database

## Stopping the Application

```bash
# Stop the React frontend with Ctrl+C in its terminal

# Stop and remove backend containers
cd .. # Return to project root if needed
docker-compose down
```

To completely remove all data (including database volumes):
```bash
docker-compose down -v
```

## API Endpoints

- `GET /api/users`: Retrieves all saved users from the database
- `POST /api/users`: Saves a list of users to the database

## Troubleshooting

- Make sure you have Docker installed on your machine https://docs.docker.com/engine/installation/mac/
- Make sure you have npm updated to latest version
- Make sure you run npm i in the frontend to install necessary packages

### Docker Issues

If you encounter issues with Docker:

```bash
# View container logs
docker-compose logs -f

# Restart containers
docker-compose restart

# Rebuild containers
docker-compose down
docker-compose build
docker-compose up -d
```

### Database Issues

To check the database directly:

```bash
# Connect to the PostgreSQL container
docker exec -it fullstack-users-app_db_1 psql -U postgres -d users_db

# Check if the users table exists
\dt

# Check structure of the users table
\d users

# Exit PostgreSQL
\q
```

### Frontend Issues

If the frontend fails to start:

```bash
# Make sure you're in the frontend directory
cd frontend

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Start the application
npm start
```

## Development Notes

- The frontend runs on the host machine (not containerized)
- The API and database are containerized using Docker

## Updating the frontend for AWS

```
aws --profile default --region us-east-2 s3 sync build/ s3://escullyfieldsync --delete; aws --profile default cloudfront create-invalidation --distribution-id E6503IBJOZATO --paths '/*'
```