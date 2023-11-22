# API Documentation for Language Learning Platform

 language learning platform designed to make language acquisition a seamless and enjoyable experience. , our backend application provides a robust foundation for creating a feature-rich language learning environment.


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



```json
    {
      "message": "user logged in successfully",
      "token": "generated-jwt-token"
    }
```



```json
    {
      "message": "user not found"
    }
```


```json
    {
      "message": "Invalid password"
    }
```





