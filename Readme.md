# API Documentation for Language Learning Platform

This is the documentation for the API endpoints provided by the Language Learning server.

## Base URL

The base URL for all API endpoints is: ``

## Authentication

All authenticated endpoints require a valid JSON Web Token (JWT) in the Authorization header.

#### Example Header

```plaintext
Authorization: Bearer <token>
```

## Endpoints

### User Registration

 - **URL**: `/user/register`
 - **Method**: `POST`
 - **Description**: Registers a new user.
 - **Request Body**:

| Field      | Type   | Description          |
|------------|--------|----------------------|
| firstName  | string | User's first name    |
| lastName   | string | User's last name     |
| email      | string | User's email address |
| password   | string | User's password      |

- Response:
  - Status: 200 OK
  - Content-Type: application/json
  - Body:

```json
    {
      "message": "user created successfully",
      "user": {
        "id": "user-id",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "role": "user"
      }
    }
    ```

- `409 Conflict`: User with the provided email already exists.
  - Body:
    ```json
    {
      "message": "user already exists"
    }
    ```

- `500 Internal Server Error`: Error creating user.
  - Body:
    ```json
    {
      "message": "Error creating user",
      "err": "Error details"
    }
    ```

### User Login

 - **URL**: `/user/register`
 - **Method**: `POST`
 - **Description**: Registers a new user.
 - **Request Body**:

| Field      | Type   | Description          |
|------------|--------|----------------------|
| email      | string | User's email address |
| password   | string | User's password      |


- Response
  - Status: 200 OK
  - Content-Type: application/json
  - Body:

- `201 Created`: User successfully logged in.
  - Body:
    ```json
    {
      "message": "user logged in successfully",
      "token": "generated-jwt-token"
    }
    ```

- `404 Not Found`: User with the provided email not found.
  - Body:
    ```json
    {
      "message": "user not found"
    }
    ```

- `401 Unauthorized`: Invalid password.
  - Body:
    ```json
    {
      "message": "Invalid password"
    }
    ```

- `500 Internal Server Error`: Error during login.
  - Body:
    ```json
    {
      "message": "Error logging in",
      "err": "Error details"
    }
    ```



