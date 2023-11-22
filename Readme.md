markdown
Copy code
# User Authentication API Documentation

This documentation outlines the usage of the user authentication API implemented using Express.js, Prisma, Bcrypt, and JSON Web Tokens (JWT).

## API Endpoints

### 1. Signup

#### Endpoint
POST /signup



#### Request Body

| Field      | Type   | Description                       |
|------------|--------|-----------------------------------|
| `firstName` | string | First name of the user.           |
| `lastName`  | string | Last name of the user.            |
| `email`     | string | Email address of the user.        |
| `password`  | string | User's password.                  |
| `role`      | string | User role (e.g., "admin", "user").|

#### Response
- `201 Created`: User account created successfully.
  ```json
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

{
  "message": "User already exists"
}
500 Internal Server Error: Error creating the user.
json
Copy code
{
  "message": "Error creating user",
  "err": "Error details"
}
2. Login
Endpoint
bash
Copy code
POST /login
Request Body
Field	Type	Description
email	string	Email address of the user.
password	string	User's password.
Response
201 Created: User logged in successfully. Returns a JWT token.
json
Copy code
{
  "message": "User logged in successfully",
  "token": "JWT_TOKEN"
}
404 Not Found: User with the provided email not found.
json
Copy code
{
  "message": "User not found"
}
401 Unauthorized: Invalid password.
json
Copy code
{
  "message": "Invalid password"
}
500 Internal Server Error: Error during the login process.
json
Copy code
{
  "message": "Error signing in",
  "err": "Error details"
}
Authentication
For secure endpoints, include the generated JWT token in the Authorization header of your requests.

Example:


Authorization: Bearer JWT_TOKEN
The token expires after 1 day (expiresIn: "1d").

Environment Variables
Ensure the following environment variable is set in a .env file:

SECRET_KEY: Secret key used for JWT token generation.


