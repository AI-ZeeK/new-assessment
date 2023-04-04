# new-assessment

# API Documentation for Node.js backend application

This is the API documentation for a Node.js backend application that exposes endpoints for user authentication, posts and comments management. The application is built using the **`express`** framework and uses **`Prisma`** ORM for database communication. The authentication uses **`JSON Web Tokens (JWT)`**.

The following endpoints are available:

## Authentication

#### Login

- URL: **`/api/auth`**
- Method: **`POST`**
- Headers:
  - Content-Type: **`application/json`**
- Body:

| Field    | Type   | Required | Description                   |
| -------- | ------ | -------- | ----------------------------- | ------------- |
| email    | string | Yes      | User's                        | email address |
| password | string | Yes      | User's password for the email |

Response:
On success, a response with a 200 OK status code will be returned, along with a JSON object containing the user's details and an access token:

Field Type Description
user object User object containing user details
token string JSON Web Token for authentication
On error, a response with the appropriate error message will be returned.

Posts
Create a new post
URL: /api/post
Method: POST
Headers:
Content-Type: application/json
Authorization: Bearer [JWT_TOKEN] (required)
Body:
Field Type Required Description
title string Yes Title of the post
content string Yes Content of the post
authorId string Yes Unique identifier of the author
Response:
On success, a response with a 201 Created status code will be returned, along with a JSON object containing the details of the created post.

On error, a response with the appropriate error message will be returned.

Get all posts
URL: /api/post

Method: GET

Headers:

Authorization: Bearer [JWT_TOKEN] (required)
Response:

On success, a response with a 200 OK status code will be returned, along with a JSON object containing an array of all posts.

On error, a response with the appropriate error message will be returned.

Delete a post
URL: /api/post/:id

Method: DELETE

Headers:

Authorization: Bearer [JWT_TOKEN] (required)
URL Params:

id: string (required)
Response:

On success, a response with a 204 No Content status code will be returned.

On error, a response with the appropriate error message will be returned.

Comments
Create a new comment
URL: /api/comment
Method: POST
Headers:
Content-Type: application/json
Authorization: Bearer [JWT_TOKEN] (required)
Body:
Field Type Required Description
postId string Yes Unique identifier of the post
comment string Yes Content of the comment
Response:
On success, a response with a 201 Created status code will be returned, along with a JSON object containing the details of the created comment.

On error, a response with the appropriate error message will be returned.

Get all comments
URL: /api/comment

Method: GET

Headers:

Authorization: Bearer [JWT_TOKEN] (required)
Response:

On success
