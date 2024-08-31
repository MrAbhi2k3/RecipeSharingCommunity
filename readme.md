
## Recipe Code Structure
The project follows a simple MERN stack structure:

- client: Contains the React frontend.
- server: Contains the Express.js backend.
- Schema: Define the MongoDB schemas and models.
- routes: Define the API routes.
- controllers: Handle route logic and interact with the database.
- middlewares: Custom middleware functions.
- db: Configuration files (e.g., database connection).

## Technologies Used
#### Frontend:

- React

#### Backend:

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) for authentication
- bcrypt for secured password hashing

# Recipe Sharing Full Stack App (MERN Stack)

## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)

## Screenshots


### 1. Recipe List
![Recipe List](screenshots/recipe-list.png)

### 2. Recipe Details
![Recipe Details](screenshots/recipe-details.png)

### 3. Login Page
![Login Page](screenshots/login.png)

### 4. Registration Page
![SignUp Page](screenshots/signup.png)

### 5. User Dashboard
![User Dashboard](screenshots/user-dashboard.png)

### 6. Favorites
![Favorites](screenshots/favorites.png)

### 7. Contact Page
![Contact](screenshots/contact.png)

## Features

- **User Authentication**: Secure login and registration system with JWT authentication.
- **Recipe Management**: Full CRUD operations for recipes including create, edit, and delete functionalities.
- **Recipe Discovery**: Explore and search for recipes shared by other users.
- **Comments and Ratings**: Leave comments and rate recipes to share feedback.
- **Favorite Recipes**: Save and manage your favorite recipes for quick access.
- **Responsive Design**: Optimized for both desktop and mobile devices for a seamless user experience.

## Prerequisites

Ensure you have the following installed:

- [Bot API](api.telegram.org) (API of Bot to Interact or Contact)
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [React.js](https://react.dev/)
- [MongoDB](https://www.mongodb.com/) (running locally for  me or You Can Host On Render or Heroku)
- [Git](https://git-scm.com/) for version control
- A text editor or IDE (e.g., Visual Studio Code)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/MrAbhi2k3/RecipeSharingCommunity.git

2. Navigate to the project directory:

       cd RecipeDB   

3. Navigate to the client directory:
     
       cd client

4. Install client dependencies:

       npm install 

5. Return to the project root:

       cd ..

6. Navigate to server folder:

       cd server

7. Create a `.env` file in the project root and configure your environment variables:
   
       PORT=2000
       MONGODB_URI=mongodb://localhost/recipedb [Create Your Own]
       SECRET=your-secret-key
Replace `your-secret-key` with a secure secret for JWT token generation.

8. Start the development server

       npm run dev

## 📫 Connect with me:

[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/MrAbhi2k3)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mrabhii2k3/)
[![Telegram](https://img.shields.io/badge/-Telegram-26A5E4?style=flat-square&logo=telegram&logoColor=white)](https://t.me/TeleRoidGroup)
[![Instagram](https://img.shields.io/badge/-Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/MrAbhi_2k3/)
[![Discord](https://img.shields.io/badge/-Discord-5865F2?style=flat-square&logo=discord&logoColor=white)](https://discord.gg/qPDzU64r)
