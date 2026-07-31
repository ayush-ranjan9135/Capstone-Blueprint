<div align="center">
  <h1>✨ TaskMatrix 🚀</h1>
  <p><strong>A Modern, High-Performance Task & Project Management Dashboard</strong></p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Zustand-4A3B32?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  </p>
</div>

<br />

## 🎯 Problem Statement
In fast-paced work environments, teams and individuals often struggle to keep track of disjointed tasks, unorganized deadlines, and scattered project files. Existing tools are either too complex (overwhelming users with unnecessary features) or too simple (lacking the depth needed for real project management). This leads to decreased productivity, missed deadlines, and a frustrating user experience.

## 💡 Solution
**TaskMatrix** is designed to bridge the gap. It provides a sleek, beautifully animated, and highly intuitive dashboard that centralizes project tracking, personal tasks, and team notifications. By focusing on a frictionless user experience with premium aesthetics and lightning-fast performance, TaskMatrix helps users organize their workflow effortlessly.

---

## 🌊 Flow of the Project
1. **Authentication:** Users log in securely to access their personalized workspace.
2. **Dashboard Overview:** Upon login, users are greeted by a centralized dashboard displaying their active tasks, project progress, and an activity feed of recent updates.
3. **Task & Project Management:** Users can navigate to dedicated sections (Tasks, Calendar, Projects) to drill down into specifics.
4. **Interactive Settings:** Users can fully customize their experience (Dark/Light mode, Notifications, Security settings) via a dynamic, interactive settings menu.
5. **Real-time Notifications:** The system provides immediate feedback and updates through an integrated notification center.

---

## 🏛️ Architecture
TaskMatrix leverages a modern decoupled architecture, optimizing for speed, maintainability, and scalability.

- **Frontend (Client):** Built with **Next.js (App Router)** and **React 19**. It utilizes Server-Side Rendering (SSR) for initial load performance and Client-Side Routing for a seamless SPA-like feel.
- **State Management:** **Zustand** is used for lightweight, globally accessible state management (handling UI themes, User Auth, and layout toggles) without the boilerplate of Redux.
- **Styling & UI:** **Tailwind CSS v4** handles responsive, utility-first styling. **Framer Motion** orchestrates complex micro-interactions and layout transitions (like the active state pills in the sidebar).
- **Form Handling:** **React Hook Form** paired with **Zod** ensures robust, strictly-typed data validation before any API submissions.
- **Mock Backend:** Currently powered by **JSON Server** to simulate a REST API environment (`dev:api`), running concurrently with the Next.js development server.

---

## 🛠️ Tech Stack

### Core
- ⚛️ **React 19** & **Next.js 16** (App Router)
- 📘 **TypeScript** (Strict Type Safety)

### Styling & UI
- 🎨 **Tailwind CSS 4** (Utility-first CSS)
- 💫 **Framer Motion** (Animations & Transitions)
- 💠 **Lucide React** (Beautiful consistent iconography)
- 🧩 **clsx** & **tailwind-merge** (Dynamic class management)

### State & Data Fetching
- 🐻 **Zustand** (Global State)
- 📡 **Axios** (HTTP Client)
- 📝 **React Hook Form** + **Zod** (Form Validation)

### Development & Tooling
- ⚙️ **JSON Server** (REST API Mocking)
- 🔄 **Concurrently** (Running UI & API together)
- 🧹 **ESLint** (Code Linting)

---

## 🚀 Getting Started

To run this project locally:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development servers (Frontend + API):**
   ```bash
   npm run dev:all
   ```
   *The frontend will run on `http://localhost:3000` and the API on `http://localhost:3001`.*

---

## 📬 Contact & Links

Feel free to reach out or check out more of my work!

- 🌐 **Portfolio:** [Alpha Portfolio](https://alpha-portfolio-five.vercel.app/)
- 🐙 **GitHub:** [ayush-ranjan9135](https://github.com/ayush-ranjan9135)
- 💼 **LinkedIn:** [Ayush Ranjan](https://www.linkedin.com/in/ayush-ranjan-9135d3/)
- 📸 **Instagram:** [@ayush.__.srivastava](https://www.instagram.com/ayush.__.srivastava?igsh=dW1zdHFjcTZnenV2)
- 📘 **Facebook:** [Ayush's Profile](https://www.facebook.com/share/1AhB4q1WeW/)
