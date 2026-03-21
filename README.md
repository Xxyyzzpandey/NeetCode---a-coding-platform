# 🚀 NeetCode Clone | Full-Stack DSA Platform

---

## 🌐 Live Demo
Experience the power of the platform here:  
**[👉 Live Link: neetcode-frontend.vercel.app](https://neetcode-frontend.vercel.app/)**

> **Note:** Since this is hosted on a **free tier**, the backend may take 30-60 seconds to "wake up" on the first request. Please be patient while the server initializes! 🚀

---


A comprehensive coding platform built to help developers master Data Structures and Algorithms. This project replicates the core functionality of LeetCode, featuring a curated problem list, an interactive code editor, and persistent progress tracking.

> **Note:** The source code for this project is hosted in a **private repository** to protect proprietary logic and configuration. This repository serves as a public overview, documentation hub, and feature showcase.

---

## 🛠️ Tech Stack

| Layer            | Technology                               |
| :--------------- | :--------------------------------------- |
| **Frontend** | React.js, Tailwind CSS, Lucide Icons     |         |
| **Backend** | Node.js, Express.js                      |
| **Database** | PostgreSQL                               |
| **Authentication**| JWT (JSON Web Tokens) & Bcrypt           |

---

## ✨ Key Features

* **Curated Roadmap:** Problems organized by difficulty and topic (Arrays, Trees, Graphs, etc.).
* **Interactive Workspace:** Split-screen interface with a high-performance code editor.
* **Progress Tracking:** Real-time synchronization of solved problems with a PostgreSQL backend.
* **User Dashboard:** Personalized stats and visual progress bars.
* **Grid Logic Engine:** Built-in support for complex submatrix and pathfinding challenges.

---

## 📁 Project Structure (Overview)

```text
├── frontend/           # React application (UI/UX)
│   ├── src/
│   │   ├── components/ # Navbar, ProblemCard, CodeEditor
│   │   ├── hooks/      # Custom API logic
│   │   └── pages/      # Dashboard, ProblemDetails, Login
├── backend/            # Express API (Logic)
│   ├── routes/         # API Endpoints (/api/problems, /api/auth)
│   ├── controllers/    # Request handling logic
│   └── middleware/     # Auth & Error handling
└── db/                 # SQL Migration & Schema files
