# IP-RMT50 API Documentation

## Authentication

Before accessing most endpoints, authentication is required. Users must include a valid Bearer token in the Authorization header.

## Endpoints

### User Management

#### POST /login

- **Description:** Logs in a user with email and password.
- **Request Body:**

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- Responses:
  (200 - OK)

  ```json
  {
    "access_token": "string"
  }
  ```

- Responses:
  (401 - Unauthorized)
  ```json
  {
    "message": "Invalid email/password"
  }
  ```

#### POST /Register

- **Description:** Registers a new user
- **Request Body:**

```json
{
  "email": "string",
  "username": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "image": "string"
}
```

- Responses:
  (201 - Created)

```json
{
  "email": "string",
  "username": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "image": "string"
}
```

- Responses:
  (400 - Bad Request)
  ```json
  {
    "message": "Validation error message"
  }
  ```

#### PATCH /isPremium

- **Description:** Registers a new user
- **Authentication Required:** YES

- Responses:
  (200 - OK)

```json
{
  "message": "User with id {userId} is now premium."
}
```

- Responses:
  (403 - Forbidden)

```json
{
  "message": "Forbidden"
}
```

#### POST /users

- **Description:** RCreates a new user. (Admin only)
- **Authentication Required:** YES
- **Request Body:**.

```json
{
  "email": "string",
  "username": "string",
  "role": "string",
  "villageId": "number",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "image": "string"
}
```

- Responses:
  (201 - Created)

  ```json
  {
    "email": "string",
    "username": "string",
    "password": "string",
    "phoneNumber": "string",
    "address": "string",
    "image": "string",
    "role": "string",
    "villageId": "number"
  }
  ```

- Responses:
  (403 - Forbidden)

  ```json
  {
    "message": "Forbidden"
  }
  ```

#### GET /users

- **Description:** Retrieves all users. (Admin only)
- **Authentication Required:** YES

- Responses:

```json
{
  "data": [
    {
      "email": "string",
      "username": "string",
      "password": "string",
      "phoneNumber": "string",
      "address": "string",
      "image": "string",
      "role": "string",
      "villageId": "number"
    }
  ]
}
```

#### PUT /users/

- **Description:** Updates a user by ID. (Admin only)
- **Authentication Required:** YES
- **Request Body:**

```json
{
  "email": "string",
  "username": "string",
  "role": "string",
  "villageId": "number",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "image": "string"
}
```

- Responses:
  (200 - OK)
  ```json
  {
    "message": "User id {userId} updated."
  }
  ```
- Responses:
  (403 - Forbidden)
  ```json
  {
    "message": "Forbidden"
  }
  ```

#### DELETE /users/

- **Description:** Deletes a user by ID. (Admin only)
- **Authentication Required:** YES
- Responses:
  (204 - No Content)

### Village Management

#### POST /villages

- **Description:** Creates a new village. (Admin only)
- **Authentication Required:** YES
- **Request Body:**

```json
{
  "name": "string",
  "leader": "string",
  "history": "string"
}
```

- Responses:
  (201 - Created)

  ```json
  {
    "message": "Village {name} created."
  }
  ```

  - Responses:
    (403 - Forbidden)

  ```json
  {
    "message": "Forbidden"
  }
  ```

#### GET /villages

- **Description:** Retrieves all villages.
- **Authentication Required:** NO
- Responses:
  (403 - Forbidden)

```json
[
  {
    "id": "number",
    "name": "string",
    "leader": "string",
    "history": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

#### GET /villages/ID

- **Authentication Required:** NO
- Responses:
  (403 - Forbidden)

```json
{
  "id": "number",
  "name": "string",
  "leader": "string",
  "history": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

- Responses:
  (404 - Not Found)

```json
{
  "message": "Village not found."
}
```

#### PUT /villages/

- **Description:** Updates a village by ID. (Admin only)
- **Authentication Required:** YES
- **Request Body:**

```json
{
  "name": "string",
  "leader": "string",
  "history": "string"
}
```

- Responses:
  (200 - OK)

```json
{
  "message": "Village id {villageId} updated."
}
```

- Responses:
  (403 - Forbidden)

```json
{
  "message": "Forbidden"
}
```

#### DELETE /villages/ID

- **Description:** Deletes a village by ID. (Admin only)
- **Authentication Required:** YES
- Responses:
  (200 - OK)

```json
{
  "message": "Village id {villageId} deleted."
}
```

- Responses:
  (403 - Forbidden)

```json
{
  "message": "Forbidden"
}
```

#### Character Management

### POST /characters

- **Description:** Creates a new character.
- **Authentication Required:** YES
- **Request Body:**

```json
{
  "name": "string",
  "abilities": "string",
  "status": "string",
  "background": "string",
  "userId": "number",
  "villageId": "number"
}
```

- Responses:
  (201 - Created)

```json
{
  "id": "number",
  "name": "string",
  "abilities": "string",
  "status": "string",
  "background": "string",
  "userId": "number",
  "villageId": "number",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### GET /characters

- **Description:** Retrieves all characters with pagination.
- **Authentication Required:** YES
- **Query Parameters:**
- page (optional): Number of page (default 1)
- limit (optional): Number of items per page (default 10)
- Responses:

```json
{
  "totalCharacters": "number",
  "totalPages": "number",
  "page": "number",
  "characters": [
    {
      "id": "number",
      "name": "string",
      "abilities": "string",
      "status": "string",
      "background": "string",
      "userId": "number",
      "villageId": "number",
      "User": {
        "id": "number",
        "username": "string",
        "phoneNumber": "string",
        "address": "string",
        "image": "string"
      },
      "Village": {
        "id": "number",
        "name": "string",
        "leader": "string",
        "history": "string"
      },
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### GET /characters/ID

- **Description:** Retrieves a character by ID.
- **Authentication Required:** YES
- Responses:
  (200 - OK)

```json
{
  "id": "number",
  "name": "string",
  "abilities": "string",
  "status": "string",
  "background": "string",
  "userId": "number",
  "villageId": "number",
  "User": {
    "id": "number",
    "username": "string",
    "phoneNumber": "string",
    "address": "string",
    "image": "string"
  },
  "Village": {
    "id": "number",
    "name": "string",
    "leader": "string",
    "history": "string"
  },
  "createdAt": "date",
  "updatedAt": "date"
}
```

- Responses:
  (404 - Not Found)

```json
{
  "message": "Character not found."
}
```

### PUT /characters/ID

- **Description:** Updates a character by ID.
- **Authentication Required:** YES
- **Request Body:**

```json
{
  "name": "string",
  "abilities": "string",
  "status": "string",
  "background": "string",
  "userId": "number",
  "villageId": "number"
}
```

- Responses:
  (200 - OK)

````json
{
  "message": "Character id {characterId} updated."
}

- Responses:
  (403 - Forbidden)

```json
{
  "message": "Forbidden"
}
````

### DELETE /characters/

- **Description:** Deletes a character by ID.
- **Authentication Required:** YES
- Responses:
  (204 - No Content)

### Errors

## The API may return the following errors:

- 400 - Bad Request: Invalid request syntax or missing parameters.
- 401 - Unauthorized: Missing or invalid authentication token.
- 403 - Forbidden: User does not have permission to perform the operation.
- 404 - Not Found: The requested resource does not exist.
- 500 - Internal Server Error: An unexpected server error occurred.


