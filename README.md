# Crowd Cruisers

**A motorcycle community evolving into a smarter way to plan and ride together.**

Crowd Cruisers began as a community-focused motorcycle web app. This repository preserves that early project and provides a starting point for a more useful, modern product: helping riders discover rides, organize groups, and prepare for journeys with confidence.

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

The original application is a React and TypeScript single-page web app. Its current codebase includes routes and screens for:

- A home page and navigation
- Account registration, login, and Firebase authentication state
- A map page
- A community chat page
- A wishlist page
- A user profile page

These are features visible in the legacy codebase; they are not necessarily the recommended scope for the next version. The refreshed product should retain or replace parts only when they support the focused ride-planning direction above.

## Proposed MVP

Start with a focused, testable version rather than rebuilding every legacy screen:

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

The existing prototype uses:

- **React 18** and **TypeScript**
- **Vite** for development and builds
- **React Router** for page navigation
- **Redux Toolkit / React Redux** for application state
- **Firebase** for authentication and related backend integration in the existing code
- **Mapbox GL** and **react-map-gl** for map-related UI
- **Tailwind CSS**, **Sass**, and component libraries for styling and interface elements

The repository's language composition is primarily TypeScript, with JavaScript, SCSS, CSS, and HTML also present. The stack describes the current codebase; it is not a commitment that every dependency will remain in a future rebuild.

## Run the existing project

You need Node.js and npm installed.

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

Vite prints the local development URL in the terminal. Some existing features may require project-specific Firebase or map configuration; review the application configuration before expecting those integrations to work in a fresh environment. Never commit private credentials or API secrets.

## Suggested next steps

1. Interview local riders and ride organizers to identify the most painful coordination problem.
2. Choose one community and geography for an initial pilot.
3. Prototype the ride listing, ride details, and RSVP flow before expanding scope.
4. Define privacy defaults and moderation expectations before adding location or messaging features.
5. Modernize dependencies and configuration as part of implementation, with tests and documentation.
6. Measure whether the product helps riders find and successfully coordinate rides, then decide what to build next.

## Vision

Make it easier for riders to find their people, plan a great ride, and enjoy the journey together.

## Contributing

This project is being reimagined. Before implementing a major feature, open an issue to describe the rider problem, proposed solution, and how success could be measured. Keep changes focused and avoid treating the legacy feature set as a required roadmap.
