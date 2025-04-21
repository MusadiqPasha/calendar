# 📅 Team Calendar

A full-stack calendar application for teams to manage and share events.

## 📖 Overview

This application powers the Team Calendar, providing a user-friendly interface for teams to create, manage, and view shared events. The system consists of a React frontend and a Node.js/Express backend with MongoDB database.

## 📁 Project Structure

- `client/` - React frontend application
  - **src/** – Source code of the React app:
    * **components/** – React components:
      * `Calendar.jsx` – Main calendar UI component
      * `Login.jsx` – Login form/page component
      * `Modal.jsx` – Popup/modal UI component
    * **services/** – Logic for external services or API calls:
      * `eventService.js` – Handles event-related API calls
    * `App.js` – Root React component
    * `App.css`, `index.css`, `styles.css` – Styling files
    * `index.js` – React app entry point
- `server/` - Node.js/Express backend API

## 🛠️ Tech Stack

- **Backend:** Node.js + Express, MongoDB (Mongoose)
- **Frontend:** React
- **Remote Access:** ngrok
  
# 🚀 Setup & Installation [ Docker ]

### Stop your local MongoDB service if you have one running:
### On Windows (Command Prompt as Administrator)
`net stop MongoDB`

### On Windows (PowerShell as Administrator)
`Stop-Service -Name MongoDB`

## Step 1 Create `.dockerignore` files 

### Frontend .dockerignore
Create a `.dockerignore` in the `client` directory:

```
node_modules
npm-debug.log
build
```
### Backend .dockerignore
Create a `.dockerignore` in the `server` directory:

```
node_modules
npm-debug.log
.env
```

## Step 2: Run Docker Compose

In the root directory of your project, run:

```bash
docker-compose up --build
```

This will:
1. Build the Docker images for your client and server
2. Start containers for MongoDB, client, and server
3. Set up the network between them
4. Map the ports so you can access them locally

## Step 3: Running in the background

```bash
docker-compose up -d
```

## Step 4: Access Your Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- MongoDB: mongodb://localhost:27017/team-calendar


### Stopping all containers

```bash
docker-compose down
```

### Using With ngrok

You can still use ngrok with Docker, but you'll need to run it from your host machine:

```bash
ngrok http 5000
```
This will create a tunnel to your Docker container's exposed port 5000.


## 🚀 Setup & Installation [ Without Docker ] 

### Server Setup (Backend)

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   ```

4. Start the server:
   ```
   node server.js
   ```

5. The server will run on port 5000 by default (http://localhost:5000)

### Client Setup (Frontend)

1. Open a new terminal window/tab

2. Navigate to the client directory:
   ```
   cd client
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the React development server:
   ```
   npm start
   ```

5. The frontend application will run on port 3000 (http://localhost:3000)

### Remote Access with ngrok

To make your backend accessible from anywhere:

1. Open another terminal window/tab

2. Run ngrok to expose your local server:
   ```
   ngrok http 5000
   ```

3. ngrok will provide a public URL (like `https://abc123def456.ngrok.io`)

4. You can now access your backend API from anywhere using this URL
   - Example: `https://abc123def456.ngrok.io/api/events`

## ⚙️ Step-by-step: How to Use Ngrok

### 🔧 1. Install ngrok

If you're on Windows/Mac/Linux, just:
- Download from: https://ngrok.com/download
- Unzip → Move it to your system path or keep in project folder

Or, using terminal (if installed via package manager):
```bash
brew install ngrok     # macOS
choco install ngrok    # Windows
```

### 🔑 2. Connect Your Account

After signup at ngrok.com, you'll get an Auth token.
Run this once:
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### 🚀 3. Expose Your Local App

If your backend runs on port 5000:
```bash
ngrok http 5000
```

You'll see something like:
```
Forwarding  https://randomstring.ngrok.io  ->  http://localhost:5000
```

Use that public URL (https://randomstring.ngrok.io) anywhere — e.g., for webhook testing or sharing with others.

## 📚 API Documentation

### Base URL

All endpoints are accessible via the base URL `/api/events`

### Endpoints

#### Get All Events

```
GET /api/events
```

Returns a list of all events in the system.

**Response Example:**
```json
[
  {
    "_id": "abc123",
    "title": "Team Meeting",
    "start": "2025-04-10T10:00:00.000Z",
    "end": "2025-04-10T11:00:00.000Z",
    "desc": "Discuss roadmap",
    "allDay": false,
    "createdBy": "musadiq"
  }
]
```

#### Get Single Event

```
GET /api/events/:id
```

Retrieves a specific event by its ID.

**Example:** `/api/events/abc123`

**Response Example:**
```json
{
  "_id": "abc123",
  "title": "Team Meeting",
  "start": "2025-04-10T10:00:00.000Z",
  "end": "2025-04-10T11:00:00.000Z",
  "desc": "Discuss roadmap",
  "createdBy": "musadiq"
}
```

#### Get Events by User

```
GET /api/events/createdBy/:user
```

Retrieves all events created by a specific user.

**Example:** `/api/events/createdBy/musadiq`

**Response Example:**
```json
[
  {
    "title": "Demo Day",
    "start": "2025-04-12T14:00:00.000Z",
    "end": "2025-04-12T16:00:00.000Z",
    "desc": "Final presentation",
    "createdBy": "musadiq"
  }
]
```

#### Create Event

```
POST /api/events
```

Creates a new event in the calendar.

**Request Body Example:**
```json
{
  "title": "Hackathon",
  "start": "2025-04-15T09:00:00Z",
  "end": "2025-04-15T17:00:00Z",
  "desc": "Build cool stuff",
  "allDay": false,
  "createdBy": "govu"
}
```

**Response Example:**
```json
{
  "_id": "xyz789",
  "title": "Hackathon",
  "start": "2025-04-15T09:00:00Z",
  "end": "2025-04-15T17:00:00Z",
  "desc": "Build cool stuff",
  "createdBy": "govu"
}
```

#### Update Event

```
PUT /api/events/:id
```

Updates an existing event by its ID.

**Example:** `/api/events/abc123`

**Request Body Example:**
```json
{
  "title": "Updated Title"
}
```

**Response Example:**
```json
{
  "_id": "abc123",
  "title": "Updated Title"
}
```

#### Delete Event

```
DELETE /api/events/:id
```

Deletes an event by its ID.

**Example:** `/api/events/abc123`

**Response Example:**
```json
{ "message": "Event deleted successfully" }
```

#### Get Events in Date Range

```
GET /api/events/range?start=2025-04-01&end=2025-04-30
```

Retrieves events between specified start and end dates.

**Response Example:**
```json
[
  {
    "title": "Demo Day",
    "start": "2025-04-12T14:00:00.000Z",
    "end": "2025-04-12T16:00:00.000Z"
  }
]
```

#### Get Upcoming Events

```
GET /api/events/upcoming
```

Retrieves all future events from the current date.

**Response Example:**
```json
[
  {
    "title": "Presentation",
    "start": "2025-04-22T12:00:00Z",
    "end": "2025-04-22T13:00:00Z"
  }
]
```

#### Search Events

```
GET /api/events/search/:query
```

Searches for events by title or description.

**Example:** `/api/events/search/hack`

**Response Example:**
```json
[
  {
    "title": "Hackathon",
    "desc": "Build cool stuff"
  }
]
```

## 💻 Usage Example

```javascript
// Example: Fetch all events
fetch('/api/events')
  .then(response => response.json())
  .then(events => console.log(events))
  .catch(error => console.error('Error fetching events:', error));
```

## ⚠️ Important Notes

- Make sure MongoDB is up and running before starting the server
- The backend API endpoints are accessible at http://localhost:5000/api/events
- The frontend application will automatically connect to the backend
- The ngrok URL is temporary and will change each time you restart ngrok (unless you have a paid account)

## 🔍 Verifying Installation

1. After starting both the client and server, open your browser to http://localhost:3000
2. You should see the Team Calendar interface
3. Test API access by visiting http://localhost:5000/api in your browser

## 🛠️ Troubleshooting

- If you encounter connection issues, verify MongoDB is running
- Check the server logs for any errors related to database connection
- If the client can't connect to the server, verify both are running and check for CORS issues
- If ngrok shows errors, ensure your server is running properly on port 5000

---

Made with ❤️ by the Team 6
