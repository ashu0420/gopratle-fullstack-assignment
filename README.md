# GoPratle – Event Requirement Posting Platform

A full-stack web application for posting event requirements for Event Planners, Performers, and Crew.

Built as part of the GoPratle Full-Stack Developer Intern technical assignment.

## Live Demo

- Frontend: https://gopratle-frontend-eta.vercel.app
- Backend: https://gopratle-backend.vercel.app

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Deployment

- Vercel
- MongoDB Atlas

## Features

- Multi-step event requirement form
- Event basics collection
- Category-specific requirements for Event Planner, Performer, and Crew
- Client-side validation
- Server-side validation
- Mongoose schema validation
- Review step before submission
- Submission success state
- Ability to post another requirement
- REST API for creating and retrieving requirements
- MongoDB persistence
- Separate production deployments for frontend and backend

## Application Flow

    Event Basics
         ↓
    Select Category
         ↓
    Category Details
         ↓
    Review Requirement
         ↓
    Submit
         ↓
    Next.js Frontend
         ↓
    Express REST API
         ↓
    MongoDB Atlas

## Project Structure

    gopratle-fullstack-assignment/
    ├── backend/
    │   ├── src/
    │   │   ├── config/
    │   │   │   └── database.js
    │   │   ├── controllers/
    │   │   │   └── requirementController.js
    │   │   ├── middleware/
    │   │   │   └── errorHandler.js
    │   │   ├── models/
    │   │   │   └── Requirement.js
    │   │   ├── routes/
    │   │   │   └── requirementRoutes.js
    │   │   └── server.js
    │   ├── package.json
    │   └── package-lock.json
    ├── frontend/
    │   ├── app/
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── components/
    │   │   ├── requirement-form/
    │   │   │   ├── CrewFields.tsx
    │   │   │   ├── EventBasics.tsx
    │   │   │   ├── PerformerFields.tsx
    │   │   │   └── PlannerFields.tsx
    │   │   └── RequirementForm.tsx
    │   ├── types/
    │   │   └── requirement.ts
    │   ├── package.json
    │   └── package-lock.json
    └── README.md

## API Endpoints

### Create Requirement

    POST /api/requirements

Creates a new event requirement after validating the submitted data.

### Get Requirements

    GET /api/requirements

Returns saved requirements ordered by most recently created.

### Example Response

    {
      "success": true,
      "count": 1,
      "data": []
    }

## Environment Variables

### Backend

Create backend/.env:

    MONGODB_URI=your_mongodb_connection_string
    PORT=5000

### Frontend

Create frontend/.env.local:

    NEXT_PUBLIC_API_URL=http://localhost:5000

For production, the frontend uses the deployed backend URL.

> Never commit .env or .env.local files to GitHub.

## Running Locally

### 1. Clone the repository

    git clone <your-github-repository-url>
    cd gopratle-fullstack-assignment

### 2. Start the backend

    cd backend
    npm install
    npm run dev

Backend runs on:

    http://localhost:5000

### 3. Start the frontend

Open another terminal:

    cd frontend
    npm install
    npm run dev

Frontend runs on:

    http://localhost:3000

## Validation

Validation is handled at multiple levels:

- Frontend: prevents incomplete submissions and provides immediate feedback.
- Backend: validates common and category-specific requirement data.
- Mongoose: enforces the database schema and allowed enum values.

This prevents invalid data from being saved even if frontend validation is bypassed.

## Category-Specific Requirements

### Event Planner

- Services required
- Guest count
- Budget
- Planning stage
- Theme
- Special requirements
- Notes

### Performer

- Performance type
- Genre
- Number of performers
- Duration
- Budget
- Sound system requirement
- Lighting requirement
- Stage requirement
- Special requirements

### Crew

- Required role
- Number of people required
- Experience level
- Duration
- Budget
- Responsibilities
- Equipment requirements
- Special requirements
- Notes

## Architecture

The frontend uses React components with RequirementForm.tsx as the main state owner for the multi-step form.

Category-specific fields are separated into individual components to keep the form modular and maintainable.

The backend follows a simple layered structure:

    Route
      ↓
    Controller
      ↓
    Model
      ↓
    MongoDB

- Routes define API endpoints.
- Controllers handle requests and validation.
- Models define the MongoDB document structure.
- Middleware handles server-side errors.
- Database configuration manages the MongoDB connection.

## Deployment

The frontend and backend are deployed as separate Vercel projects from the same GitHub repository.

- Frontend root directory: frontend/
- Backend root directory: backend/
- Production database: MongoDB Atlas

The backend exports the Express application for Vercel while retaining app.listen() for local development.

## Assignment

This project was developed for the GoPratle Full-Stack Developer Intern technical assignment.
