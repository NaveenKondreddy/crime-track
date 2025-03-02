# Crime Track Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Frontend Components](#frontend-components)
4. [Backend Components](#backend-components)
5. [Database Schema](#database-schema)
6. [API Documentation](#api-documentation)
7. [Installation and Setup](#installation-and-setup)
8. [User Guide](#user-guide)
9. [Future Enhancements](#future-enhancements)

## Project Overview

Crime Track is a web application designed to help communities report and track criminal activities. The system allows users to submit crime reports, view reported crimes, search through reports, and access educational resources about crime awareness and safety tips.

### Key Features
- Crime reporting system with form validation
- Searchable database of reported crimes
- Crime awareness and education resources
- Safety tips for community members
- Responsive design for mobile and desktop use

## System Architecture

Crime Track follows a client-server architecture with a frontend built using HTML, CSS, and JavaScript, and a backend powered by Node.js, Express, and MongoDB.

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **External Libraries**: Font Awesome (icons)

## Frontend Components

### Pages
1. **Home Page (index.html)**
   - Navigation header
   - Hero section with call-to-action button
   - Crime reporting modal form
   - Crime awareness and education section
   - Safety tips section

2. **Reported Crimes Page (reported-crimes.html)**
   - Navigation header
   - Search functionality
   - Tabular display of reported crimes
   - Detail view functionality

### Styles (styles.css)
The application uses a responsive design with the following key style components:
- Sticky header navigation
- Modal dialog for crime reporting
- Grid-based layouts for awareness and safety sections
- Responsive tables for crime data
- Mobile-friendly design with media queries

### Scripts (script.js)
Client-side functionality includes:
- Modal handling (open/close)
- Form submission with validation
- Crime data fetching and display
- Search functionality
- Table interaction (view details)

## Backend Components

### Server Configuration (index.js)
The main server file configures Express, connects to MongoDB, and sets up routes and middleware.

### Database Connection (db.js)
Handles connection to MongoDB using the MongoDB Node.js driver.

```javascript
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'CrimeTrackDB';

let db;

const connectDB = async () => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
```

### Models (crimeModel.js)
Defines the data schema and methods for crime reports.

```javascript
const { getDB } = require('../config/db');

const crimeSchema = {
  title: String,
  description: String,
  location: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Reported' }
};

const Crime = {
  create: async (crimeData) => {
    const db = getDB();
    const result = await db.collection('crimes').insertOne(crimeData);
    return result;
  },
  find: async () => {
    const db = getDB();
    return await db.collection('crimes').find().toArray();
  }
};

module.exports = Crime;
```

### Routes (crimeRoutes.js)
Handles API endpoints for crime reporting and retrieval.

```javascript
const express = require('express');
const router = express.Router();
const Crime = require('../models/crimeModel');

// Create a new crime report
router.post('/', async (req, res) => {
  const crimeData = req.body;
  try {
    const result = await Crime.create(crimeData);
    res.status(201).json({ message: 'Crime reported', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to report crime' });
  }
});

// Get all crime reports
router.get('/', async (req, res) => {
  try {
    const crimes = await Crime.find();
    res.json(crimes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch crimes' });
  }
});

module.exports = router;
```

## Database Schema

### Crime Collection
- **title**: String - Title/type of crime
- **description**: String - Detailed description of the incident
- **location**: String - Location where the crime occurred
- **date**: Date - Date when the crime occurred (defaults to current date)
- **status**: String - Current status of the crime report (defaults to "Reported")

## API Documentation

### Endpoints

#### POST /api/crimes
Creates a new crime report.

**Request Body:**
```json
{
  "title": "Theft",
  "description": "Bicycle stolen from front yard",
  "location": "123 Main St",
  "date": "2025-03-01T08:00:00.000Z"
}
```

**Response (201 Created):**
```json
{
  "message": "Crime reported",
  "id": "65dc7f2a8e3a8d7c5e1b9a3f"
}
```

**Response (500 Internal Server Error):**
```json
{
  "error": "Failed to report crime"
}
```

#### GET /api/crimes
Retrieves all reported crimes.

**Response (200 OK):**
```json
[
  {
    "_id": "65dc7f2a8e3a8d7c5e1b9a3f",
    "title": "Theft",
    "description": "Bicycle stolen from front yard",
    "location": "123 Main St",
    "date": "2025-03-01T08:00:00.000Z",
    "status": "Reported"
  },
  {
    "_id": "65dc7f2a8e3a8d7c5e1b9a40",
    "title": "Vandalism",
    "description": "Graffiti on public building",
    "location": "Central Park",
    "date": "2025-02-28T15:30:00.000Z",
    "status": "Reported"
  }
]
```

**Response (500 Internal Server Error):**
```json
{
  "error": "Failed to fetch crimes"
}
```

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/crime-track.git
   cd crime-track
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure database connection:**
   Edit the `config/db.js` file with your MongoDB connection details if necessary.

4. **Start the application:**
   ```bash
   npm start
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`

## User Guide

### Reporting a Crime

1. Navigate to the Crime Track homepage
2. Click the "Submit a Tip" button in the hero section or "Report" in the navigation
3. Fill in the required information in the modal form:
   - Crime Title (e.g., "Theft", "Vandalism")
   - Description of the incident
   - Location where it occurred
   - Date of the incident
4. Click "Submit" to report the crime
5. A confirmation message will appear if the report was successful

### Viewing Reported Crimes

1. Click on "Reported Crimes" in the navigation
2. A table displays all reported crimes with basic information
3. Click the "View" button on any row to see the full description

### Searching for Crimes

1. On the Reported Crimes page, use the search bar at the top
2. Enter a search term related to crime title or location
3. Click the search button to filter the results
4. Click "Reset" to clear the search and show all crimes again

### Future Enhancements
1. **User Authentication**
   - User registration and login
   - Role-based access control (citizens, law enforcement)

2. **Enhanced Reporting**
   - Photo upload capability
   - Location picker with map integration
   - Anonymous reporting option

3. **Advanced Features**
   - Crime statistics and trend analysis
   - Community alert system
   - Integration with law enforcement databases
   - Comment and update system for reported crimes

4. **Mobile Application**
   - Native mobile apps for iOS and Android
   - Push notifications for nearby crime alerts
