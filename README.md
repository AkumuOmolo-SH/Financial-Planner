# Smart-Saving-Financial-Planner

A savings management dashboard that helps users create, manage, and track progress on financial goals. This website keeps you organized and motivated with real-time goal tracking and progress updates.


**#Features**

Goal Dashboard. View all your financial goals in one place.

Each goal displays:

-Current saved amount

-Target amount

-Time remaining

-Deadline

Status: Ongoing, 30 Days Left, or Overdue

Visual progress bar

Create, Read, Update, Delete (CRUD) Create new savings goals (e.g., “Travel Fund”, “Emergency Fund”)
Read and display all goals from db.json

**Update:**

-Goal name

-Target amount

-Saved amount (via deposit)

-Deadline

-Category

-Delete goals and instantly update the UI

Persistent updates via PATCH requests to the backend

Progress Bar Logic

-This is capped at 100% and rendered with a dynamic progress bar.

Deadline Warnings -See how much time is left to complete each goal
Get alerts for:

-Goals with deadlines within 30 days

-Overdue goals (deadline passed and not completed)

**#Tech Stack Framework: Next.js**
-State Management: React Hooks

-API Simulation: JSON Server


-Data Format: Local db.json file

Data & Backend All data is stored and served locally using json-server.

---

**#Getting Started**

Clone the Repo

Install Dependencies

Start the JSON Server

Make sure db.json is in the root of your project.

**### Author**

Akumu Omolo
GitHub: https://github.com/AkumuOmolo-SH

``
Folder Structure (Relevant) pgsql Copy Edit src/ ├── app/ │ ├── components/ │ │ ├── GoalForm.jsx │ │ ├── GoalItem.jsx │ │ ├── GoalsList.jsx │ │ ├── ProgressBar.jsx │ └── page.js ├── db.json ├── global.css
``
**###  Author**

**Akumu Omolo**  
GitHub: [@AkumuOmolo-SH](https://github.com/AkumuOmolo-SH)

---

**### License**

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
This project is licensed under the [MIT License](LICENSE).

