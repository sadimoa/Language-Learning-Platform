# API Documentation for Language Learning Platform

 language learning platform designed to make language acquisition a seamless and enjoyable experience. , our backend application provides a robust foundation for creating a feature-rich language learning environment.

## Base URL

Base URL: [https://language-learning-platform.onrender.com](https://language-learning-platform.onrender.com)


## Authentication

All authenticated endpoints require a valid JSON Web Token (JWT) in the Authorization header.

#### Example Header

```plaintext
Authorization: Bearer <token>
```

## Endpoints


### User Registration

- **URL**: `api/register/signup`
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

- **URL**: `api/register/login`
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

- **URL:** `api/users`
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

- **URL:** `api/users/:id`
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

### Delete User

- **URL:** `api/users/delete/:id`
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

- **URL:** `api/lessons`
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

- **URL:** `api/lessons/:id`
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

- **URL:** `api/lessons/add`
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

- **URL:** `api/lessons/update/:id`
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

- **URL:** `api/lessons/delete/:id`
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

- **URL:** `api/quizzes`
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

- **URL:** `api/quizzes/:id`
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

- **URL:** `api/quizzes/add`
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

- **URL:** `api/quizzes/update/:id`
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

- **URL:** `api/quizzes/delete/:id`
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


## exercise Endpoints

### Get All exercises

- **URL:** `/exercises`
- **Method:** `GET`
- **Description:** Get all exercises.
- **Permissions:** Requires permission.
- **Response:**
  - **Status:** 200 OK
  - **Body:** Array of exercise objects

```json
    [
      {
        "id": 1,
        "question": "exercise Question",
        "answerOptions": ["Options A", "Options B", "Options C"],
        "answer": "Options A"
        // ... other exercise properties
      }
      // More exercises...
    ]
 ```

### Get exercise by ID

- **URL:** `/exercises/:id`
- **Method:** `GET`
- **Description:** Get a specific exercise by ID.
- **Permissions:** Requires permission.
- **Parameters:**
  - `id`: exercise ID
- **Response:**
  - **Status:** 200 OK
  - **Body:** exercise object

```json
    {
      "id": 1,
      "question": "exercise Question",
      "answerOptions": ["Options A", "Options B", "Options C"],
      "answer": "Options A"
      // ... other exercise properties
    }
```

### Create a exercise

- **URL:** `/exercises/add`
- **Method:** `POST`
- **Description:** Create a new exercise.
- **Permissions:** Requires permission.
- **Request Body:**

| Field         | Type   | Description                                      |
| ------------- | ------ | ------------------------------------------------ |
| question      | string | New exercise Question                                |
| answerOptions | array  | ["New Options A", "New Options B", "New Options C"] |
| answer | string | New Options A                                     |
|               |        |                                                  |

- Response:
  - Status: 201 Created
  - Body:

```json
{
  "message": "exercise created successfully",
  "exercise": {
    "id": 2,
    "question": "New exercise Question",
    "answerOptions": ["New Options A", "New Options B", "New Options C"],
    "answer": "New Options A",
    // ... other exercise properties
  }
}

```

### Update a exercise

- **URL:** `/exercises/update/:id`
- **Method:** `PUT`
- **Description:** Update an existing exercise by ID.
- **Permissions:** Requires permission.
- **Parameters:**
  - `id`: exercise ID
- **Request Body:**

 Field         | Type   | Description                                      |
| ------------- | ------ | ------------------------------------------------ |
| question      | string | New exercise Question                                |
| answerOptions | array  | ["New Options A", "New Options B", "New Options C"] |
| answer | string | New Options A                                     |
|               |        |                            


- Response:
  - Status: 201 Created
  - Body:

```json
{
  "id": 2,
  "question": "Updated exercise Question",
  "answerOptions": ["Updated Options A", "Updated Options B", "Updated Options C"],
  "answer": "Updated Options A",
  // ... other exercise properties
}

```


### Delete a exercise

- **URL:** `/exercises/delete/:id`
- **Method:** `DELETE`
- **Description:** Delete a exercise by ID.
- **Permissions:** Requires permission.
- **Parameters:**
  - `id`: exercise ID
- **Response:**
  - **Status:** 204 No Content
  - **Body:** No content in response body.




## Exercise Answer Endpoints

### Get All Exercise Answers

- **URL:** `/api/exercise-answer`
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
        "exerciseId": 456
      },
      // More answers...
    ]
```

### Get exercise Answer by ID

- **URL:** `/api/exercise-answer/:id`
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
      "exerciseId": 456
    }
```

### Submit exercise Answer

- **URL:** `/api/exercise-answer/submit`
- **Method:** `POST`
- **Description:** Submit a exercise answer, check correctness, and update user progress.
- **Authentication:** Required
- **Request Body:**
 
 | Field   | Type   | Description            |
|---------|--------|------------------------|
| answer  | string | User's submitted answer|
| exerciseId  | number | exercise ID                |
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
    "exerciseId": 789,
    "userId": 101
  }
}
```

### Delete exercise Answer

- **URL:** `/api/answers/delete/:id`
- **Method:** `DELETE`
- **Description:** Delete a specific answer by ID.
- **Permissions:** Requires special permission.
- **Parameters:**
  - `id`: Answer ID
- **Response:**
  - **Status:** 204 No Content
  - **Body:** None


## Exercise Result Endpoints

### Get All Results

- **URL:** `/api/exercise-results`
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
        "exerciseId": 123,
        "userId": 456
      },
      // More results...
    ]
```

### Delete Result

- **URL:** `/api/exercise-results/delete/:id`
- **Method:** `DELETE`
- **Description:** Delete a specific result by ID.
- **Permissions:** Requires special permission.
- **Parameters:**
  - `id`: Result ID
- **Response:**
  - **Status:** 204 No Content
  - **Body:** None
