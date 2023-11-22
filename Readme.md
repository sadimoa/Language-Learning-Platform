
Authentication API Documentation
Overview
The Authentication API provides endpoints for user signup and login functionalities. These endpoints enable the creation and authentication of users within the system using email and password.

Base URL
The base URL for all authentication endpoints is https://your-api-base-url/auth.

Endpoints
1. Signup
Endpoint
POST /signup
Description
Creates a new user account with the provided information.

Request
Body Parameters:
firstName (string): First name of the user.
lastName (string): Last name of the user.
email (string): Email address of the user.
password (string): User's password.
role (string): User role (e.g., "user", "admin").
Responses
201 Created: User account created successfully.

json
Copy code
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "user"
  }
}
409 Conflict: User with the provided email already exists.

json
Copy code
{
  "message": "User already exists"
}
500 Internal Server Error: Error creating user.

json
Copy code
{
  "message": "Error creating user",
  "err": "Internal server error details"
}
2. Login
Endpoint
POST /login
Description
Authenticates a user and generates a JSON Web Token (JWT) for subsequent authorized requests.

Request
Body Parameters:
email (string): Email address of the user.
password (string): User's password.
Responses
201 Created: User logged in successfully.

json
Copy code
{
  "message": "User logged in successfully",
  "token": "generated-jwt-token"
}
401 Unauthorized: Invalid password.

json
Copy code
{
  "message": "Invalid password"
}
404 Not Found: User with the provided email not found.

json
Copy code
{
  "message": "User not found"
}
500 Internal Server Error: Error during the login process.

json
Copy code
{
  "message": "Error signing",
  "err": "Internal server error details"
}
