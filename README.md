# 🌾 AgroConnect

**AgroConnect** is a modern web platform built with **React, HTML, CSS, and JavaScript** that connects farmers with agriculture experts. It empowers farmers by providing a collaborative environment for learning, sharing knowledge, and accessing expert guidance.

---

## 🚀 Features
- 🗨️ **Q&A with Experts:** Ask questions and get answers in real-time.  
- 📝 **Article Sharing:** Post, read, and share informative articles on farming techniques.  
- ❤️ **Likes & Comments:** Engage with the community and provide feedback.
- 🌐 **Multilingual Support:** View content in multiple languages. *(Currently under development)*  
- 🗣 **Text-to-Speech:** Listen to articles, posts, and Q&A answers. *(Currently being implemented)*  
- 👤 **User Profiles:** Farmers and experts can create and manage profiles.
- 🌤 **Weather Updates:** Check real-time weather to plan farming activities.
- 🔔 **Notifications:** Stay updated with responses, comments, and new posts.
- 📱 **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices.  
- 🔒 **Secure Authentication:** Protects user data with login and signup.  

---

## 🛠 Technologies Used
- **Frontend:** HTML, CSS, JavaScript, React  
- **Backend (Optional):** Node.js, Express, MongoDB
-**APIs & Libraries:** Text-to-Speech APIs, Multilingual libraries, Google Login API


---

## Backend Environment Variables

Create a file named `.env` inside the backend folder and add:

GOOGLE_API_KEY=your-google-api-key
DB_PATH=your-mongodb-connection-string
SESSION_SECRET=your-session-secret
PLANT_ID_API_KEY=your-plant-id-api-key

Refer to backend/.env.example for variable names.

---

## Frontend Environment Variables

Create a file named `.env` inside the frontend folder and add:

VITE_WEATHER_API_KEY=your-weather-api-key



## ⚡ Installation
1️⃣ Download the Project

Download the project ZIP or clone the repository:

git clone <repository-url>


Extract it to your desired location.

2️⃣ Navigate to the folder:

cd mern_project-main/

3️⃣ Restore Database Backup 

mongorestore --db Agroconnect ./db-backup/Agroconnect

4️⃣ Setup Backend

Navigate to the backend folder:

cd mern_project-main/backend


Install backend dependencies:

npm install


Start the backend server:

npm start


5️⃣ Setup Frontend

cd mern_project-main/frontend/agrofp


Install frontend dependencies:

npm install


Start the frontend development server:

npm run dev



6️⃣ Access the Application
