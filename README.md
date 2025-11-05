# TravelWise — Frontend (React + TypeScript + Vite)

This repository contains the TravelWise web frontend built with React, TypeScript and Vite. It is designed to be a lightweight SPA that integrates with a Python Flask backend (optional) to handle authentication and itinerary generation.

This README documents how to run the frontend locally, how it talks to the backend, and recommended database/storage approaches for itineraries.

## Table of contents
- Project overview
- Requirements
- Quick start (frontend)
- Backend (Flask) — brief guide
- API surface used by the frontend
- Database schema (MS SQL) — recommended tables
- Development notes
- Contributing
- License

## Project overview

- Frontend: React + TypeScript + Vite
- UI: Tailwind CSS + some custom components in `src/components`
- API client: `src/lib/api.ts` centralizes calls to the backend
- Pages: `src/pages` contains the main screens (Home, Login, SignUp, TripDetails, Itinerary, MyTrips...)

The app can run standalone as a frontend-only demo, or integrate with a Flask API for authentication and itinerary generation.

## Requirements

- Node.js 18+ (or compatible)
- npm or yarn
- Optional: Python 3.8+ and Flask if you want to run the backend locally

## Quick start — Frontend (local)

1. Install dependencies

   ```cmd
   cd d:\\TravelWise
   npm install
   ```

2. Start the dev server

   ```cmd
   npm run dev
   ```

3. Open the app in your browser at the Vite URL printed (usually http://localhost:5173)

### Environment / API base URL

By default the frontend uses the API base URL declared in `src/lib/api.ts` (currently set to `http://127.0.0.1:5000`). For production or a different backend address you can either:

- Edit `src/lib/api.ts` and set `BASE_URL` to your deployed backend URL, or
- Replace the hard-coded value with an environment variable (recommended). Example change in `src/lib/api.ts`:

```ts
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
```

then create a `.env` with:

```text
VITE_API_URL=https://api.example.com
```

Restart the dev server after changing env vars.

## Backend (Flask) — brief guide

The frontend was designed to integrate with a Python Flask backend exposing these endpoints (example names shown):

- POST /login — body: { email, password } -> returns { token, user }
- POST /signup — body: { name, email, password } -> returns { message }
- POST /generate_itinerary — body: { destination, travelers, startDate, endDate, preferences } -> returns generated itinerary JSON

You can run a minimal Flask app with CORS enabled and implement these endpoints. The frontend's `src/lib/api.ts` expects the generate endpoint at `/generate_itinerary`.

If you want a copy of the example Flask server used during development (including CORS and a simple /login mock), ask and I can add it to the repo.

## API used by the frontend

All API calls are centralized in `src/lib/api.ts`:

- `login(email, password)` — calls POST `${BASE_URL}/login` and stores token + user in localStorage on success
- `signup({ name, email, password })` — calls POST `${BASE_URL}/signup`
- `generateItinerary(payload)` — calls POST `${BASE_URL}/generate_itinerary` and returns the generated itinerary JSON
- `submitTripDetails(...)` — placeholder for trip submission (POST `${BASE_URL}/trip`)

When the backend responds with error information, the frontend displays the backend message directly (no additional UI validation was added beyond basic form controls).


## Development notes

- UI components live under `src/components` and `src/pages`.
- API surface is in `src/lib/api.ts`. Keep network logic there to make it easy to swap backends or mock responses during testing.
- The project currently stores auth token and user object in `localStorage` (see `login` implementation).
