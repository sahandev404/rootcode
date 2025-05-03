```markdown
# RootCode Application

## Overview
The **RootCode Application** is a Spring Boot-based project designed to manage posts and their associated comments. It provides a RESTful API for creating, retrieving, and managing posts and comments.

## Features
- Create and retrieve posts.
- Add comments to posts.
- Retrieve comments for a specific post.

## Technologies Used
- **Java**: Programming language.
- **Spring Boot**: Framework for building the application.
- **Maven**: Dependency management and build tool.
- **Jakarta Validation**: For input validation.
- **Lombok**: To reduce boilerplate code.
- **H2 Database** (or any configured database): For data persistence.

## Project Structure
```
src/main/java/com/sahandevaka/rootcode/
├── dto/                # Data Transfer Objects (DTOs)
│   ├── PostDTO.java
│   ├── CommentDTO.java
│   └── GetCommentDTO.java
├── entity/             # JPA Entities
│   ├── Post.java
│   └── Comment.java
├── repo/               # Repositories for database access
│   ├── PostRepository.java
│   └── CommentRepository.java
├── service/            # Business logic
│   └── CommentService.java
└── controller/         # REST Controllers
└── PostController.java
```

## Prerequisites
- **Java 17** or higher
- **Maven 3.8+**
- Any IDE (e.g., IntelliJ IDEA)

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/sahandev404/rootcode.git
cd rootcode
```

### Build the Project
Run the following command to build the project:
```bash
mvn clean install
```

### Run the Application
Start the application using:
```bash
mvn spring-boot:run
```

The application will be available at `http://localhost:8080`.

## API Endpoints

### Posts
- **Create Post**: `POST /api/posts`
- **Get All Posts**: `GET /api/posts`
- **Get Post by ID**: `GET /api/posts/{id}`

### Comments
- **Add Comment to Post**: `POST /api/comments`
- **Get Comments by Post ID**: `GET /api/posts/{postId}/comments`

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
```