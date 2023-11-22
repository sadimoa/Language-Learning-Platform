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

```json
    {
      "message": "user already exists"
    }
```

### User Login

 - **URL**: `/user/login`  <!-- Corrected URL -->
 - **Method**: `POST`
 - **Description**: Logs in an existing user.
 - **Request Body**:

| Field      | Type   | Description          |
|------------|--------|----------------------|
| email      | string | User's email address |
| password   | string | User's password      |

- Response
  - Status: 200 OK
  - Content-Type: application/json
  - Body:

```json
    {
      "message": "user logged in successfully",
      "token": "generated-jwt-token"
    }







