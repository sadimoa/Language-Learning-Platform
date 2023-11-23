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

- **URL**: `/register/signup`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:

| Field     | Type   | Description          |
| --------- | ------ | -------------------- |
| firstName | string | User's first name    |
| lastName  | string | User's last name     |
| email     | string | User's email address |
| password  | string | User's password      |

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
    "email": "john.doe@example.com"
  }
}
```

```json
{
  "message": "user already exists"
}
```

### User Login

- **URL**: `/register/login`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:

| Field    | Type   | Description          |
| -------- | ------ | -------------------- |
| email    | string | User's email address |
| password | string | User's password      |

- Response
  - Status: 200 OK


## User Endpoints

### Get All Users

- **URL:** `/users`
- **Method:** `GET`
- **Description:** Get all users.
- **Permissions:** Requires permission.
- **Response:**
  - **Status:** 201 OK
  - **Body:** Array of user objects

```json
[
  {
    "id": "user-id",
    "username": "User Name"
    // ... other user properties
  }
  // More users...
]
```

### Get User by ID

- **URL:** `/users/:id`
- **Method:** `GET`
- **Description:** Get a specific user by ID.
- **Permissions:** Requires permission.
- **Parameters:**
  - `id`: User ID
- **Response:**
  - **Status:** 200 OK
  - **Body:** User object
    ```json
    {
      "id": "user-id",
      "username": "User Name"
      // ... other user properties
    }
    ```

## Delete User

- **URL:** `/users/delete/:id`
- **Method:** `DELETE`
- **Description:** Delete a user by ID.
- **Permissions:** Requires permission.
- **Parameters:**
  - `id`: User ID
- **Response:**
  - **Status:** 204 No Content
  - **Body:** No content in response body.

## Lesson Endpoints

### Get All Lessons

- **URL:** `/lessons`
- **Method:** `GET`
- **Description:** Get all lessons.
- **Authentication:** Requires authentication.
- **Response:**
  - **Status:** 200 OK
  - **Content-Type:** application/json
  - **Body:**

```json
[
  {
    "id": "lesson-id",
    "title": "Lesson Title",
    "videoUrl": "https://example.com/video",
    "content": "Lesson content..."
  }
  // More lessons...
]
```

### Get Lesson by ID

- **URL:** `/lessons/:id`
- **Method:** `GET`
- **Description:** Get a specific lesson by ID.
- **Permissions:** Requires permission.
- **Parameters:**
  - `id`: Lesson ID
- **Response:**
  - **Status:** 200 OK
  - **Content-Type:** application/json
  - **Body:**

```json
{
  "id": "lesson-id",
  "title": "Lesson Title",
  "videoUrl": "https://example.com/video",
  "content": "Lesson content..."
}
```

### Create a Lesson

- **URL:** `/lessons/add`
- **Method:** `POST`
- **Description:** Create a new lesson.
- **Permissions:** Requires permission.
- **Request Body:**

| Field    | Type   | Description    |
| -------- | ------ | -------------- |
| id       | string | Lesson ID      |
| title    | string | Lesson Title   |
| videoUrl | string | Video URL      |
| content  | string | Lesson Content |

- Response

  - **Status:** 201 Created
  - **Content-Type:** application/json
  - **Body:**

  ```json
  {
    "message": "Lesson created successfully",
    "lesson": {
      "id": "new-lesson-id",
      "title": "New Lesson",
      "videoUrl": "https://example.com/new-lesson",
      "content": "New lesson content..."
    }
  }
  ```

### Update a Lesson

- **URL:** `/lessons/update/:id`
- **Method:** PUT
- **Description:** Update an existing lesson by ID.
- **Permissions:** Requires permission.
- **Parameters:**
  - `id`: Lesson ID
- **Request Body:**

| Field    | Type   | Description    |
| -------- | ------ | -------------- |
| id       | string | Lesson ID      |
| title    | string | Lesson Title   |
| videoUrl | string | Video URL      |
| content  | string | Lesson Content |

- Response:
  - Status: 201 Created
  - Content-Type: application/json
  - Body:
  - json

```json
{
  "id": "updated-lesson-id",
  "title": "Updated Lesson",
  "videoUrl": "https://example.com/updated-lesson",
  "content": "Updated lesson content..."
}
```

### Delete a Lesson

- **URL:** `/lessons/delete/:id`
- **Method:** DELETE
- **Description:** Delete a lesson by ID.
- **Permissions:** Requires permission.
- **Parameters:**
  - `id`: Lesson ID
- **Response:**
  - **Status:** 204 No Content
  - **Body:** No content in response body.

## Quiz Endpoints

### Get All Quizzes

- **URL:** `/quizzes`
- **Method:** `GET`
- **Description:** Get all quizzes.
- **Permissions:** Requires permission.
- **Response:**
  - **Status:** 200 OK
  - **Body:** Array of quiz objects
    ```json
    [
      {
        "id": 1,
        "question": "Quiz Question",
        "answerChoices": ["Choice A", "Choice B", "Choice C"],
        "correctAnswer": "Choice A"
        // ... other quiz properties
      }
      // More quizzes...
    ]
    ```

### Get Quiz by ID

- **URL:** `/quizzes/:id`
- **Method:** `GET`
- **Description:** Get a specific quiz by ID.
- **Permissions:** Requires permission.
- **Parameters:**
  - `id`: Quiz ID
- **Response:**
  - **Status:** 200 OK
  - **Body:** Quiz object

```json
    {
      "id": 1,
      "question": "Quiz Question",
      "answerChoices": ["Choice A", "Choice B", "Choice C"],
      "correctAnswer": "Choice A"
      // ... other quiz properties
    }
```

### Create a Quiz

- **URL:** `/quizzes/add`
- **Method:** `POST`
- **Description:** Create a new quiz.
- **Permissions:** Requires permission.
- **Request Body:**

| Field         | Type   | Description                                      |
| ------------- | ------ | ------------------------------------------------ |
| question      | string | New Quiz Question                                |
| answerChoices | array  | ["New Choice A", "New Choice B", "New Choice C"] |
| correctAnswer | string | New Choice A                                     |
|               |        |                                                  |

- Response:
  - Status: 201 Created
  - Body:

```json
{
  "message": "Quiz created successfully",
  "quiz": {
    "id": 2,
    "question": "New Quiz Question",
    "answerChoices": ["New Choice A", "New Choice B", "New Choice C"],
    "correctAnswer": "New Choice A",
    // ... other quiz properties
  }
}

```

### Update a Quiz

- **URL:** `/quizzes/update/:id`
- **Method:** `PUT`
- **Description:** Update an existing quiz by ID.
- **Permissions:** Requires permission.
- **Parameters:**
  - `id`: Quiz ID
- **Request Body:**

 Field         | Type   | Description                                      |
| ------------- | ------ | ------------------------------------------------ |
| question      | string | New Quiz Question                                |
| answerChoices | array  | ["New Choice A", "New Choice B", "New Choice C"] |
| correctAnswer | string | New Choice A                                     |
|               |        |                            


- Response:
  - Status: 201 Created
  - Body:

```json
{
  "id": 2,
  "question": "Updated Quiz Question",
  "answerChoices": ["Updated Choice A", "Updated Choice B", "Updated Choice C"],
  "correctAnswer": "Updated Choice A",
  // ... other quiz properties
}

```


### Delete a Quiz

- **URL:** `/quizzes/delete/:id`
- **Method:** `DELETE`
- **Description:** Delete a quiz by ID.
- **Permissions:** Requires permission.
- **Parameters:**
  - `id`: Quiz ID
- **Response:**
  - **Status:** 204 No Content
  - **Body:** No content in response body.





## Quiz Answer Endpoints

### Get All Answers

- **URL:** `/api/answers`
- **Method:** `GET`
- **Description:** Get all answers.
- **Permissions:** Requires special permission.
- **Response:**
  - **Status:** 200 OK
  - **Body:** Array of answer objects
```jsona
    [
      {
        "id": 1,
        "answer": "Example Answer",
        "isCorrect": true,
        "userId": 123,
        "quizId": 456
      },
      // More answers...
    ]
```

### Get Answer by ID

- **URL:** `/api/answers/:id`
- **Method:** `GET`
- **Description:** Get a specific answer by ID.
- **Permissions:** Requires special permission.
- **Parameters:**
  - `id`: Answer ID
- **Response:**
  - **Status:** 200 OK
  - **Body:** Answer object

```json
    {
      "id": 1,
      "answer": "Example Answer",
      "isCorrect": true,
      "userId": 123,
      "quizId": 456
    }
```

### Submit Quiz Answer

- **URL:** `/api/answers/submit`
- **Method:** `POST`
- **Description:** Submit a quiz answer, check correctness, and update user progress.
- **Authentication:** Required
- **Request Body:**
 
 | Field   | Type   | Description            |
|---------|--------|------------------------|
| answer  | string | User's submitted answer|
| quizId  | number | Quiz ID                |
| userId  | number | User ID                |

- Response:
  - Status: 201 Created
  - Body:

```json
{
  "answer": "User Answer",
  "message": "Correct answer",
  "result": {
    "id": 2,
    "point": 10,
    "quizId": 789,
    "userId": 101
  }
}
```

### Delete Answer

- **URL:** `/api/answers/delete/:id`
- **Method:** `DELETE`
- **Description:** Delete a specific answer by ID.
- **Permissions:** Requires special permission.
- **Parameters:**
  - `id`: Answer ID
- **Response:**
  - **Status:** 204 No Content
  - **Body:** None


## Result Endpoints

### Get All Results

- **URL:** `/api/results`
- **Method:** `GET`
- **Description:** Get all results.
- **Permissions:** Requires special permission.
- **Response:**
  - **Status:** 200 OK
  - **Body:** Array of result objects

```json
    [
      {
        "id": 1,
        "point": 10,
        "quizId": 123,
        "userId": 456
      },
      // More results...
    ]
```

### Delete Result

- **URL:** `/api/results/delete/:id`
- **Method:** `DELETE`
- **Description:** Delete a specific result by ID.
- **Permissions:** Requires special permission.
- **Parameters:**
  - `id`: Result ID
- **Response:**
  - **Status:** 204 No Content
  - **Body:** None
