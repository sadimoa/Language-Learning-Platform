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

## 1. 409 Conflict: User with the provided email already exists.

```json
{
  "message": "User already exists"
}


