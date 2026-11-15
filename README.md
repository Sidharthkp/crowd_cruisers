# Crowd Cruisers

**A motorcycle community evolving into a smarter way to plan and ride together.**

Crowd Cruisers began as a community-focused motorcycle web app. Its original implementation is split across a frontend and a companion server. Together, they provide a starting point for a more useful, modern product: helping riders discover rides, organize groups, and prepare for journeys with confidence.

> **Project status:** Early-stage concept and legacy prototype. The product direction below is a proposal for the next version—not a claim that these capabilities are already implemented.

## The opportunity

Motorcycle riders often coordinate through disconnected maps, messaging apps, social posts, and personal notes. It can be difficult to find rides that match your preferences, understand a route before joining, coordinate a group, or share essential trip information.

Generic travel tools help with navigation, but they are not designed around the social and practical needs of riding together.

## Product direction

Crowd Cruisers can grow from a community app into a **ride planning and coordination platform**. The focus is not to preserve every feature from the original prototype. Instead, the next version should concentrate on a small set of rider problems and deliver them well:

1. **Discover and organize rides** — create ride plans with a route, date, pace, distance, meeting point, and clear participation details.
2. **Make group rides easier to coordinate** — share plans, manage RSVPs, communicate changes, and keep key ride information in one place.
3. **Help riders prepare** — provide a concise trip brief with route highlights, planned stops, weather information, and a pre-ride checklist.
4. **Build a useful local riding community** — help riders find people and events that fit their interests, experience, and location, with privacy and safety controls.

Potential future enhancements—such as motorcycle-specific route recommendations, offline trip details, trusted rider profiles, and post-ride summaries—should be validated with riders before being prioritized.

## Who it's for

- Riders looking for local rides and motorcycle communities
- Organizers coordinating small or large group rides
- Touring riders planning multi-stop journeys
- Newer riders seeking welcoming, clearly described group events

## Why Crowd Cruisers

A great group ride takes more than a map link. Riders need to know what they are joining, how the group will coordinate, and what to prepare for. Crowd Cruisers aims to bring the social layer and practical planning details together while keeping the experience rider-first.

## Existing project: the starting point

The original product consists of two repositories:

- **Frontend:** [`Sidharthkp/crowd_cruisers`](https://github.com/Sidharthkp/crowd_cruisers) — a React and TypeScript single-page web app.
- **Server:** [`Sidharthkp/server_of_crowd-cruisers`](https://github.com/Sidharthkp/server_of_crowd-cruisers) — a JavaScript and Express server that provides API routes, data models, and Socket.IO messaging.

The frontend code includes a home page and navigation, registration/login with Firebase authentication, a map page, community chat, wishlist, and profile pages. The server code includes API areas for map pins, posts and rides/events, groups, and user profiles. It uses MongoDB through Mongoose for application data and Firebase Admin middleware for authentication on protected routes. The server also uses Socket.IO for chat-related real-time messaging and Multer for image uploads.

These are features visible in the legacy codebases—not a requirement to retain every feature. The refreshed product should keep, replace, or remove parts only when they support the focused ride-planning direction above.

## Proposed MVP

Start with a focused, testable version rather than rebuilding every legacy screen or endpoint:

- Browse and create community rides
- View ride details, including route/map link, meetup point, date, distance, and pace
- RSVP and see the participant list
- Share ride updates and essential trip information
- Basic user profiles with privacy-conscious controls

**Out of scope for the first iteration:** real-time rider tracking, emergency-response guarantees, complex navigation, payments, and broad social-network features. These add significant safety, operational, and product complexity and should only be considered after user research and a clear implementation plan.

## Safety and privacy principles

- Make location sharing optional, explicit, and time-limited.
- Do not imply that the app can guarantee rider safety or emergency response.
- Let organizers communicate ride expectations, route details, and changes clearly.
- Collect only the personal information needed for the product experience.
- Treat route, profile, and group membership visibility as product decisions that require careful privacy controls.

## Technology

### Frontend

- **React 18** and **TypeScript**
- **Vite** for development and builds
- **React Router** for page navigation
- **Redux Toolkit / React Redux** for application state
- **Firebase** for authentication integration
- **Mapbox GL** and **react-map-gl** for map-related UI
- **Tailwind CSS**, **Sass**, and component libraries for styling and interface elements

### Server

- **Node.js** and **Express** for the HTTP API
- **MongoDB** with **Mongoose** for data persistence
- **Firebase Admin** middleware for authentication on protected routes
- **Socket.IO** for real-time chat events
- **Multer** for image upload handling

The frontend repository's language composition is primarily TypeScript, with JavaScript, SCSS, CSS, and HTML also present. The server repository is JavaScript. These describe the current codebases; they are not a commitment that every dependency or architectural choice will remain in a future rebuild.

## Run the existing frontend

You need Node.js and npm installed. From the frontend repository:

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

Vite prints the local development URL in the terminal. Some frontend features require project-specific Firebase or map configuration.

## Run the existing server

The server is maintained in the separate [`server_of_crowd-cruisers`](https://github.com/Sidharthkp/server_of_crowd-cruisers) repository. It expects a MongoDB connection string in `MONGO_URL` and listens on port `3000` in the current implementation.

From that repository, install dependencies and start the development server:

```bash
npm install
npm run dev
```

Configure required Firebase Admin credentials and other service settings securely for your environment. The existing server configuration should be reviewed before deployment; do not commit credentials or API secrets. The legacy server currently configures permissive CORS, so production deployment requires an explicit origin allowlist and a security review.

## Suggested next steps

1. Interview local riders and ride organizers to identify the most painful coordination problem.
2. Choose one community and geography for an initial pilot.
3. Prototype the ride listing, ride details, and RSVP flow before expanding scope.
4. Define privacy defaults and moderation expectations before adding location or messaging features.
5. Review the frontend/server integration, modernize dependencies and configuration, and add tests and documentation.
6. Measure whether the product helps riders find and successfully coordinate rides, then decide what to build next.

## Vision

Make it easier for riders to find their people, plan a great ride, and enjoy the journey together.

## Contributing

This project is being reimagined. Before implementing a major feature, open an issue to describe the rider problem, proposed solution, and how success could be measured. Keep changes focused and avoid treating the legacy feature set as a required roadmap.
