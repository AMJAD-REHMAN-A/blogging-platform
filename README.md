# Blogging Platform API Documentation

This document provides an overview of the RESTful API endpoints for the Blogging Platform. The API is designed to allow users to manage blog posts with CRUD operations.

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Usage](#usage)
- [Technology Choices](#technology-choices)

## API Endpoints

The API offers the following endpoints:

- `GET /api/posts`: Fetch a list of all blog posts.
- `GET /api/posts/:id`: Fetch a specific blog post by its ID.
- `POST /api/posts`: Create a new blog post.
- `PUT /api/posts/:id`: Update an existing blog post.
- `DELETE /api/posts/:id`: Delete a blog post.

## Authentication

Authentication is required to access certain endpoints (POST, PUT, DELETE). The API uses JSON Web Tokens (JWT) for authentication. To authenticate, include a bearer token in the `Authorization` header of your requests.

## Usage

1. **Fetch All Blog Posts:**

   Send a GET request to `/api/posts` to fetch a list of all blog posts.

2. **Fetch a Specific Post:**

   Send a GET request to `/api/posts/:id`, replacing `:id` with the post ID, to fetch a specific blog post.

3. **Create a New Post:**

   Send a POST request to `/api/posts` with the following JSON data:

   ```json
   {
     "title": "Example Title",
     "content": "This is the content of the post.",
     "author": "John Doe"
   }
4. **Update a Post:**
   Send a PUT request to /api/posts/:id, replacing :id with the post ID, with the JSON data you want to update:
     ```json
   {
     "title": "Updated Title",
     "content": "Updated content."
   }
5. **Delete a Post:**
   Send a DELETE request to /api/posts/:id, replacing :id with the post ID, to delete a specific blog post.

## Technology Choices
**Node.js:** Node.js is chosen for its asynchronous, event-driven nature, making it suitable for building scalable and performant APIs.

**Express.js:** Express.js is a popular web application framework for Node.js that simplifies route handling and middleware usage.

**MongoDB:** MongoDB is selected as the database due to its flexibility and scalability, making it a good fit for storing blog post data.

**Mongoose:** Mongoose is used as an Object Data Modeling (ODM) library for MongoDB, providing an easy way to define schemas and interact with the database.

**JSON Web Tokens (JWT):** JWT is utilized for authentication, offering a secure and stateless way to verify user identity.

## Setup
1. Clone this repository.
2. Install Node.js and npm.
3. Install dependencies: **npm install**.
4. Start the server: **npm start**.
