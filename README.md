# Smart Attendance System

## Introduction
The Smart Attendance System is a React-based web application that allows students to mark attendance for sessions and enables administrators to manage sessions and generate reports.

It uses Firebase Authentication for Google Sign-In and JSON Server as a mock backend for data persistence. The system demonstrates CRUD operations, protected routes, responsive design, and automated testing.

---

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Git Workflow](#git-workflow)
- [Future Improvements](#future-improvements)
- [License](#license)
- [Author](#author)

---

## Features

### Student Features
- Google Authentication login
- View available sessions
- Mark attendance per session
- Prevent duplicate attendance

### Admin Features
- Create sessions
- Delete sessions
- View attendance records
- Generate PDF reports
- View system summary dashboard

### System Features
- Role-based protected routes
- Fully responsive design mobile and desktop
- Persistent data using JSON Server API
- Reusable React components
- Automated testing using Vitest

---

## Tech Stack
- React (Frontend framework)
- Tailwind CSS (Styling)
- Firebase Authentication (Google OAuth)
- JSON Server (Mock backend API)
- React Router DOM (Routing)
- Vitest and React Testing Library (Testing)
- jsPDF and html2canvas (Report generation)

---

## Installation

### 1. Clone repository
```bash
git clone https://github.com/EzraKipyego/Smart-Attendance.git
```
## 2. Navigate project
```bash
cd smart-attendance
```
## 3. Install dependencies
```bash
npm install
```
## 4. Start JSON Server
```bash
npx json-server --watch db.json --port 3000
```
## 5. Start development server
```bash
npm run dev
```
--- 
## Usage

### Student flow
- Login with Google
- View available sessions
- Mark attendance

## Admin Flow
- Login as admin
- Create/delete sessions
- View attendance records
--- 
## Testing
This project uses Vitest and React Testing Library.
--- 
### Run tests
- npm test
### What is tested:
- Page rendering
- Component visibility
- Basic UI behavior
- Data rendering from mocked API
---
## Git Workflow
- Feature-based development using branches
- Separate commits per feature
- Merging completed features into main branch
- Clean and structured version control history
---
## Future Improvements
- Replace JSON Server with Firebase Firestore
- Add email notifications
- Add QR code attendance scanning
- Improve admin analytics dashboard
- Deploy using Vercel
---
## License
This project is licensed under the [MIT License](LICENSE).
## Author
Ezra Kipyego