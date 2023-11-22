# User Authentication API Documentation

This API provides user authentication functionalities, allowing users to sign up and log in securely.

## Base URL

All endpoints are relative to the base URL of your server.

## Endpoints

### 1. Sign Up

#### Endpoint

POST /signup




#### Request Body


| Field      | Type   | Description          |
|------------|--------|----------------------|
| firstName  | string | User's first name    |
| lastName   | string | User's last name     |
| email      | string | User's email address |
| password   | string | User's password      |
| role       | string | User's role          |

#### Response

- `201 Created`: User successfully created.
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

### 2. Log In

#### Endpoint

POST /login



#### Request Body


| Field      | Type   | Description          |
|------------|--------|----------------------|
| email      | string | User's email address |
| password   | string | User's password      |


#### Response

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



