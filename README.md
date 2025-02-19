# Medical Charity System

Medical Charity System is a Node.js-based web application designed to streamline the donation process for medical equipment, clothes, and medicines. It supports multiple user roles (Admin, Donor, and Agent) with role-based dashboards and permissions, ensuring that donations are handled securely and efficiently from submission to collection.

> **Developed by:** **Muhammed Elbarber**

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [Files and Environment Setup](#files-and-environment-setup)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Contact](#contact)

---

## Features

- **User Authentication & Authorization**
  - Secure signup, login, and logout using Passport.js.
  - Role-based access control for Admins, Donors, and Agents.
- **Donation Management**
  - **Donors** can submit donation requests (including file uploads) and track the status.
  - **Admins** have a comprehensive dashboard to review, accept/reject donations, and assign agents.
  - **Agents** can view assigned donation requests, manage collections, and update collection statuses.
- **Profile Management**
  - All users can view and update their profiles.
- **Responsive UI**
  - Built using EJS templating with a reusable layout and partials for a seamless user experience.
- **Robust Error Handling & Flash Messaging**
  - Instant feedback for actions performed across the application.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** Passport.js, bcrypt.js
- **Templating:** EJS
- **File Uploads:** Multer
- **Session Management:** express-session
- **Others:** connect-flash, method-override

> **Note:** This project is built using the Model-View-Controller (MVC) design pattern for clear separation of concerns and maintainability.


---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/medical-charity-system.git
   cd medical-charity-system
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3500
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```

   > **Note:** The `.env` file contains sensitive information and is excluded from version control by `.gitignore`.

4. **Run the Application:**

   ```bash
   npm start
   ```

   The application should now be running on [http://localhost:3500](http://localhost:3500).

---

## Configuration

- **Database:**  
  Ensure MongoDB is running locally or use a cloud provider. Update the `MONGO_URI` in your `.env` file accordingly.

- **File Uploads:**  
  Uploaded images are stored in the `public/uploads` directory. Make sure this directory exists and is writable.

- **Authentication:**  
  Configure Passport.js strategies in `config/passport.js`.

---

## Folder Structure

The project is organized for clear separation of concerns and maintainability. Below is an overview:

```
medical-charity-system/
├── app.js                   # Main application entry point
├── config/                  # Configuration files
│   ├── dbConnection.js      # MongoDB connection setup
│   └── passport.js          # Passport.js authentication strategies
├── controllers/             # Business logic controllers for features
│   ├── authController.js    # Authentication (signup, login, logout)
│   ├── adminController.js   # Admin operations and dashboard logic
│   ├── donorController.js   # Donor operations (donations, profile, dashboard)
│   ├── agentController.js   # Agent operations (collections, profile, dashboard)
├── middleware/              # Custom middleware (auth, error handling)
│   └── index.js             # Middleware functions to protect routes
├── models/                  # Mongoose models
│   ├── user.js              # User model (admins, donors, agents)
│   └── equipment.js         # Equipment/donation model
├── public/                  # Public files served dynamically
│   └── uploads/             # Uploaded images for donations
├── assets/                  # Static assets (CSS, JS, images) served by Express
├── routes/                  # Express route definitions mapped to controllers
│   ├── auth.js              # Authentication routes
│   ├── admin.js             # Admin routes
│   ├── donor.js             # Donor routes
│   ├── agent.js             # Agent routes
│   └── home.js              # Routes for home/static pages
├── views/                   # EJS templates for rendering HTML pages
│   ├── partials/            # Reusable EJS partials (header, footer, etc.)
│   ├── layout.ejs           # Main layout file for EJS templates
│   ├── auth/                # Authentication views (login, signup)
│   ├── admin/               # Admin dashboard and pages
│   ├── donor/               # Donor dashboard, donation forms, profiles
│   ├── agent/               # Agent dashboard and collection pages
│   └── home/                # Home and informational pages
├── .env                     # Environment variables (not committed)
└── .gitignore               # Specifies files/folders to ignore in Git
└── Project Report.pdf       # Project details in pdf file
```

> **Note:** The `.gitignore` file ensures sensitive files (like `.env` and `node_modules`) and unnecessary files are not committed to the repository.

---

## Files and Environment Setup

- **`.env`:**  
  This file holds environment-specific settings (like your database URI and session secrets). **Do not commit this file** to version control.

- **`.gitignore`:**  
  Lists files and directories that Git should ignore (e.g., `node_modules/`, `.env`, `public/uploads/`). This helps to keep your repository clean and secure.

---

## Usage

- **Admin:**
  - Log in as an admin to access a comprehensive dashboard.
  - Manage donation requests by approving, rejecting, or assigning agents.
  - Monitor system metrics and manage user profiles.
  
- **Donor:**
  - Sign up and log in to submit donation requests (with image uploads).
  - Track the status of your donation requests via your personalized dashboard.
  - Edit or delete pending donation requests.
  
- **Agent:**
  - Log in to view your assigned donation collections.
  - Mark donations as collected and update collection details.
  - Manage your personal profile.

---


## Future Enhancements

- **Enhanced UI/UX:**  
  Further improvements in design and responsiveness.
- **Notification System:**  
  Implement email and in-app notifications for status updates.
- **Analytics:**  
  Add detailed reporting and analytics for donation trends.
- **API Integration:**  
  Develop a RESTful API for mobile apps or third-party integrations.
- **Automated Testing:**  
  Integrate testing frameworks (e.g., Jest or Mocha) for better code quality.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any questions or collaborations, please reach out:

**Muhammed Elbarber**  
Email: [muhammedelbarber@gmail.com](mailto:muhammedelbarber@gmail.com)

---
