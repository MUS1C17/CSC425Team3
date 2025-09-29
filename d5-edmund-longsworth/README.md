## Q&A API — d4-edmund-longsworth

This is a small Express-based REST API that exposes CRUD endpoints for a question-and-answer data model.

## What it does

- Provides an API to create, read, update and delete questions.
- Returns consistent JSON responses with a `success` boolean and either `data` or `error` information.
- Supports a simple JSON payload format for questions and answers.

## How it works (high level)

- Built with Node.js and Express. Routes are defined in `routes/questionAndAnswerRoutes.js` and handled by controller functions in `controllers/questionAndAnswerController.js`.
- The controllers returns data from the mongoose database.
- Environment variables are read from a `.env` file (via `dotenv`) when present. The server will attempt to connect to MongoDB using `process.env.MONGO_URI` or fall back to a local default.

## Tech stack / dependencies

- Node.js (>= 16 recommended)
- Express 5
- Mongoose (optional — used for MongoDB wiring)
- dotenv (for environment variables)
- cors
- nodemon (dev dependency for hot reload)

Dependencies are listed in `package.json`.

## API endpoints

Base path: `/api`

- POST /api/questions — Create a new question (controller returns a sample created object)
- GET /api/questions — Retrieve all questions (returns sample array)
- GET /api/questions/:id — Retrieve a specific question by ID (returns sample object with requested ID)
- PUT /api/questions/:id — Update a question by ID (returns sample updated object)
- DELETE /api/questions/:id — Delete a question by ID (returns sample deletion confirmation)

There is also a root endpoint:

- GET / — Returns a small JSON object listing available endpoints and a welcome message.

All responses follow the shape:

{
	"success": boolean,
	"data": object | null,
	"error": string | null
}

## Environment variables

Create a `.env` file in the project root to customize the runtime. Supported variables:

- MONGO_URI — MongoDB connection string (defaults to `mongodb://localhost:27017/d4-edmund-longsworth`)
- PORT — Port the server listens on (defaults to `3000`)

Example `.env`:

MONGO_URI=mongodb://localhost:27017/d4-edmund-longsworth
PORT=3000

If you don't provide `MONGO_URI`, the app still runs but will attempt to connect to the default local MongoDB.

## Install & run

Open a terminal (cmd.exe on Windows) and run:

```cmd
cd C:\Users\<you>\Desktop\Projects\CSC425Team3\d5-edmund-longsworth
npm install
```

To run in development with automatic reload (requires `nodemon`):

```cmd
npm run dev
```

To run in production mode:

```cmd
npm start
```

If you see errors about missing packages, run `npm install` again in the project folder.

## Quick examples

Retrieve all questions (using curl):

```cmd
curl http://localhost:3000/api/questions
```

Create a question (example JSON body):

```cmd
curl -X POST http://localhost:3000/api/questions -H "Content-Type: application/json" -d "{\"author\":\"Alice\",\"text\":\"What is the API?\"}"
```

## Troubleshooting

- "npm run dev" fails with "missing script: dev": ensure `package.json` contains a `dev` script. This project includes `dev: "nodemon server.js"`.
- "Cannot find module 'mongoose'" or other missing package errors: run `npm install` in the project root.
- "Database connection error": either start a local MongoDB instance or set `MONGO_URI` to a working MongoDB connection string.
- Port already in use: change `PORT` in `.env` or kill the process using the port.

## Next steps / improvements

- Add validation and request body schema (e.g., using Joi or express-validator).
- Add unit and integration tests for the routes and controllers.
- Add API documentation (Swagger/OpenAPI) and example Postman collection.

## Files of interest

- `server.js` — application entry point and route wiring.
- `routes/questionAndAnswerRoutes.js` — route definitions.
- `controllers/questionAndAnswerController.js` — route handlers (returns sample data today).
- `models/QuestionsAndAnswers.js` — Mongoose model placeholder.
- `package.json` — scripts and dependency list.

## License

ISC (see `package.json`)

---

## AI USE

- tailoring professor given tests to fit my project and adding new ones
- compiling my words on the project to create a comprehensive README

