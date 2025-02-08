# eventify- Event Management App

## 🚀 Overview
The **Evntify** is a full-stack web application that allows users to create, manage, and explore various events. Users can register, log in, and add events with details such as title, description, date, and category.

## 🛠 Features
- 🔹 **User Authentication**: Register and log in securely.
- 🔹 **Event Creation**: Add new events with title, description, date, and category.
- 🔹 **Event Filtering**: Search and filter events by category.
- 🔹 **Event Display**: Events are displayed in a responsive grid layout.
- 🔹 **Real-time Updates**: Newly created events appear instantly.

## 🎯 Tech Stack
### **Frontend**
- ⚛️ React.js (with React Router)
- 🎨 Tailwind CSS / Custom CSS
- 📦 Fetch API for HTTP requests

### **Backend**
- 🟢 Node.js & Express.js
- 🗄️ MongoDB (for storing events and user data)
- 🔑 JWT Authentication

## 📂 Project Structure
```
📦 eventify
 ┣ 📂 frontend (React Frontend)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📜 App.jsx
 ┃ ┃ ┣ 📜 index.js
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┃ ┣ 📜 EventForm.jsx
 ┃ ┃ ┃ ┣ 📜 Dashboard.jsx
 ┃ ┃ ┃ ┣ 📜 DashboardUI.jsx
 ┃ ┃ ┃ ┣ 📜 Home.jsx
 ┃ ┃ ┃ ┣ 📜 GuestLogin.jsx
 ┃ ┃ ┃ ┣ 📜 Register.jsx
 ┃ ┃ ┃ ┣ 📜 Login.jsx
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┃ ┣ 📜 Header.jsx
 ┃ ┃ ┃ ┣ 📜 Header.css
 ┣ 📂 backend (Node.js Backend)
 ┃ ┣ 📜 server.cjs
 ┃ ┣ 📜 db.js
 ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📜 auth.js
 ┃ ┃ ┣ 📜 events.js
 ┃ ┣ 📂 models
 ┃ ┃ ┣ 📜 Events.js
 ┃ ┃ ┣ 📜 User.js
```

## 🏗️Setup Instructions
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/GnautSpace/eventify.git
cd eventify
```

### **2️⃣ Install Dependencies**
#### For Backend
```sh
cd backend
npm install
```
####  For Frontend
```sh
cd ../frontend
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the **server** directory and add:
```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

### **4️⃣ Start the Application**
#### 🚀 Start Backend
```sh
cd backend
npm start
```
####  Start Frontend
```sh
cd frontend
npm run dev
```

##  Usage Guide
1️⃣ **Register/Login** to access event management features.
2️⃣ **Create an Event** by providing a title, description, date, and category.
3️⃣ **Browse and Filter Events** using the category dropdown.
4️⃣ **Enjoy a Smooth User Experience** with real-time updates.

##  API Endpoints
| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| POST   | `/api/auth/register`| Register a new user|
| POST   | `/api/auth/login`   | User login         |
| GET    | `/api/events`       | Fetch all events   |
| POST   | `/api/events/event` | Create a new event |

##  License
This project is licensed under the **MIT License**.

---
_💡 Feel free to contribute and improve this project!_

