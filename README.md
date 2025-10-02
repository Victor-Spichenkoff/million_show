# The Million Show Game
[VISIT](https://million-show.vercel.app/)

# 📌 Overview

The Million Show Game is a fullstack project inspired by "Who Wants to Be a Millionaire".
It combines a modern frontend, a robust backend, and a structured database to deliver a complete experience — from user authentication to gameplay mechanics and admin management.

This project was designed with a strong focus on:

✅ Clean architecture & best practices (SOLID, modular design, organized codebase)

✅ High-quality UI/UX with animations, skeletons and smooth feedback

✅ Scalability and maintainability through automation, testing and database migrations


# Features
🔐 User authentication & roles (player, admin) with JWT/Auth Guard

👤 Profiles & dashboards for players and administrators

📝 Admin CRUD for questions and answers

🏆 Scoring & ranking system powered by a unique algorithm for realistic results

🎭 Helps system (three types, with probability & error logic for a real-game feeling)

⚡ Real-time feedback & informative messages

🛠 Admin panel for user/question management with search system

📊 Relational DB with migrations, seeding & auto-cleanup history

🧪 High test coverage & automation

🎨 Animations, skeletons and responsive design

# 🛠 Tech
## Frontend
- React/Next.js
- TailwindCSS
- Axios
- FontAwesome
- Figma (Prototyping & Design)

## Backend
- Nest.js
- TypeOrm
- JWT + Guards
- SOLID
- Documentation (UML + Swagger)


# 🚀 Biggest Challenges & Solutions
- Such a large project come with hundreds of challenges. These are the most interesting:
## 🌍 Handle multi-lingual pagination
- Built a caching and updating system for page numbers per language
- Integrated a search system that works with multiple languages

## 🎯 Helps System
- Designed a probabilistic engine to generate human-like answers
- Added realistic chances of mistakes to simulate the real TV game

## Points, Ranking, History & Search
- Build a powerful points system with different kinds of reward:
  - Less helps used = more points
  - Less time used = more points
  - More questions = more points
- Ranking system based on points and best match based on points/time
- History with auto cleaner, to improve DB efficiency, and information persistence, such as duration, helps used, right question...  
- Search system at the ADMIN dashboard to easily manage data

## 🐞 Debugging
- Solved complex bugs in both Next.js and Nest.js environments
- Added unit tests and automated flows to ensure reliability

# Doing now
- Adding extra skeletons
- Building E2E tests on frontend

---

# 👨‍💻 ME

**Victor Spichenkoff Santana**

📧 [email](mailto:victor.ss.estudos@gmail.com)

💼 [LinkedIn](www.linkedin.com/in/victor-spichenkoff-santana-8314b2189)

🌐 [Portfolio](https://my-portfolio-lyart-pi-90.vercel.app/en)
