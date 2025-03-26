# Task Manager

A full-stack task management application using React, Node.js, Express, and MongoDB.

## 🚀 Features
- Add, update, delete tasks
- Mark tasks as completed or pending
- Filter tasks by status
- Search tasks by ID

## 🛠 Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Database:** MongoDB (Mongoose ORM)

## 📌 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/gauravgd123/Task-Manager
cd task-manager
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```

#### ✨ Configure `.env` for Backend
Create a `.env` file inside `backend/` with:
```env
PORT=5000
MONGO_URI=mongodb+srv://gdangwal268:SnaPkz40CxvqLgSU@taskmanager.5iaah.mongodb.net/"
```

Run the server:
```sh
npm run dev
```

### 3️⃣ Frontend Setup
```sh
cd frontend
npm install
```

#### ✨ Configure `.env` for Frontend
Create a `.env` file inside `frontend/` with:
```env
VITE_API_URL=http://localhost:5000/api/tasks
```

Run the frontend:
```sh
npm run dev
```

##  API Endpoints
### ➤ Create a Task

**POST** `/api/tasks`
```json
{
  "title": "New Task",
  "description": "This is a test task"
}
```
Response:
```json
{
  "msg": "Task saved successfully",
  "data": {
    "_id": "1234567890",
    "title": "New Task",
    "description": "This is a test task",
    "completed": false
  }
}
```

### ➤ Get All Tasks
**GET** `/api/tasks`

Response:
```json
[
  {
    "_id": "1234567890",
    "title": "New Task",
    "description": "This is a test task",
    "completed": false
  }
]
```

### ➤ Get Task by ID
**GET** `/api/tasks/:id`

Response:
```json
{
  "_id": "1234567890",
  "title": "New Task",
  "description": "This is a test task",
  "completed": false
}
```

### ➤ Update Task
**PUT** `/api/tasks/:id`
```json
{
  "completed": true
}
```
Response:
```json
{
  "_id": "1234567890",
  "title": "New Task",
  "description": "This is a test task",
  "completed": true
}
```

### ➤ Delete Task
**DELETE** `/api/tasks/:id`
Response:
```json
{
  "message": "Task deleted"
}
```

## 🧪 Testing the API
You can test the API using:
- **Postman**: Import the API endpoints and test requests
- **cURL**:
```sh
curl -X GET http://localhost:5000/api/tasks
```

## Screenshots

### 🏠 Home Page
![Home Page](screenshots/task-manager-UI.png)
![Home Page](screenshots/add-task.png)

### ✅ Task List database
![Task List](screenshots/database-tasks.png)
![Task List](screenshots/added-task.png)
![Task List](screenshots/added-tasks.png)




