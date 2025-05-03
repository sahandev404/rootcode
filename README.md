# RootCode Application

## Overview
The **RootCode Application** is a full-stack project consisting of a backend built with Spring Boot and a frontend built with React, TypeScript, and Vite. It provides a RESTful API for managing posts and comments, along with a modern frontend interface for users to interact with the application.

## Features
- Backend:
  - Create, retrieve, and delete posts.
  - Add and retrieve comments for posts.
  - RESTful API with validation and error handling.
- Frontend:
  - React-based UI with TypeScript.
  - TailwindCSS for styling.
  - Axios for API calls.
  - React Router for navigation.

## Technologies Used
### Backend
- **Java**: Programming language.
- **Spring Boot**: Framework for building the application.
- **Maven**: Dependency management and build tool.
- **Jakarta Validation**: For input validation.
- **Lombok**: To reduce boilerplate code.
- **H2 Database** (or any configured database): For data persistence.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript for type safety.
- **Vite**: Build tool for fast development.
- **TailwindCSS**: Utility-first CSS framework.
- **Axios**: HTTP client for API calls.

## Project Structure
```
rootcode/
├── backend/                # Spring Boot backend
│   ├── src/main/java/com/sahandevaka/rootcode/
│   │   ├── dto/            # Data Transfer Objects (DTOs)
│   │   ├── entity/         # JPA Entities
│   │   ├── repo/           # Repositories for database access
│   │   ├── service/        # Business logic
│   │   └── controller/     # REST Controllers
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── services/       # API service calls
│   │   └── types/          # TypeScript types
```

## Prerequisites
- **Java 17** or higher
- **Maven 3.8+**
- **Node.js 18+**
- **pnpm** (for frontend dependency management)

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/sahandev404/rootcode.git
cd rootcode
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd rootcode
   ```
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will be available at `http://localhost:8080`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
   The frontend will be available at `http://localhost:5173`.

## API Endpoints

### Posts
- **Create Post**: `POST /api/v1/posts`
- **Get All Posts**: `GET /api/v1/posts`
- **Get Post by ID**: `GET /api/v1/posts/{id}`
- **Delete Post**: `DELETE /api/v1/posts/{id}`

### Comments
- **Add Comment to Post**: `POST /api/v1/posts/{id}/comments`
- **Get Comments by Post ID**: `GET /api/v1/posts/post/{postId}/comments`

## Validation Rules
- **PostDTO**:
  - `title`: Must not be blank.
  - `content`: Must not be blank.
- **CommentDTO**:
  - `content`: Must not be blank.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author
Developed by [sahandev404](https://github.com/sahandev404).