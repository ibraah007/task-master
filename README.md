TaskMaster - TODO App

A simple, fast, and responsive web-based TODO application built during the Dev.wengi Speed Hackathon.
It helps users manage daily tasks efficiently with full CRUD functionality, filtering, and progress tracking.

🚀 Live Demo

👉 Add your link here:

https://Ashomondi.github.io/task-master/
✨ Features
✅ Core Features (CRUD)
➕ Create tasks
📋 View tasks
✏️ Edit tasks
🗑️ Delete tasks
⚡ Extra Features
✅ Mark tasks as complete / incomplete
🔍 Filter tasks (All / Active / Completed)
🔢 Remaining tasks counter
📊 Progress bar
💾 LocalStorage persistence (data saved in browser)
📭 Empty state message
🔐 Basic input sanitization (XSS protection)
🛠️ Tech Stack
HTML
CSS
JavaScript (Vanilla)
LocalStorage (browser storage)
📂 Project Structure
task-master/
 ├── index.html
 ├── style.css
 ├── script.js
⚙️ How It Works
User adds a task
Task is stored in an array
Data is saved in LocalStorage
UI is re-rendered dynamically
User can filter, edit, or delete tasks
🧠 Data Model

Each task is stored like this:

{
  id: Date.now(),
  text: "Sample task",
  completed: false
}
▶️ How to Run Locally
git clone https://github.com/YOUR_USERNAME/task-master.git
cd task-master

Then open:

index.html
🌐 Deployment

This project is deployed using GitHub Pages:

GitHub Pages

Steps:

Push code to GitHub
Enable Pages in Settings
Select main branch
Deploy from root folder
🎯 Hackathon Goals

This project was built with focus on:

⚡ Fast execution (4-hour challenge)
🎯 Clean and minimal UI
🧠 Functional priority over complexity
✅ Fully working product (no mock features)
🧪 Demo Features

During demo, the app can:

Add tasks in real time
Filter tasks instantly
Track progress visually
Persist data after refresh
🚀 Future Improvements
🌙 Dark mode
☁️ Backend sync (database)
📱 Mobile app version
🔔 Notifications / reminders
👨‍💻 Author

Ashley Adhiambo
Ibrahim Samuel

🏁 Conclusion

TaskMaster demonstrates how a simple idea can be turned into a fully functional product by focusing on execution, clarity, and usability within a limited time frame.
