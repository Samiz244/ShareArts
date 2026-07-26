# ShareArts

ShareArts is a React application for discovering artists, sharing artwork, and following creators through a personalized feed.

## Features

- Google sign-in with Firebase Authentication
- Public artwork gallery
- Authenticated artwork upload flow
- Personal and public artist profiles
- Artist discovery
- Following feed for signed-in users
- Client-side routing and persistent login state
- API integration for user profiles and application data

## Technology

- React 19
- React Router
- Firebase Authentication
- Axios and REST endpoints
- HTML and CSS
- Create React App

## Routes

| Route | Purpose |
|---|---|
| `/` | Home page |
| `/gallery` | Browse shared artwork |
| `/upload` | Upload artwork |
| `/profile` | View the signed-in user's profile |
| `/profile/:uid` | View another artist's profile |
| `/artists` | Discover artists |
| `/following-feed` | View artwork from followed creators |

## Local setup

```bash
git clone https://github.com/Samiz244/ShareArts.git
cd ShareArts
npm install
npm start
```

The React development server runs at `http://localhost:3000` and proxies API requests to `http://localhost:5050`.

## Available commands

```bash
npm start
npm test
npm run build
```

## Architecture note

This repository contains the React client. It expects compatible REST endpoints for user and artwork data. Firebase handles Google authentication, while application-specific profile information is synchronized through the API.

## Status

ShareArts is a portfolio project. Planned improvements include documenting the backend service, adding end-to-end tests, moving environment-specific Firebase configuration into environment variables, and publishing a hosted demo.