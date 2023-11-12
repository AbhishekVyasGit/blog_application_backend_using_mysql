
---

# Blog Application API Documentation

## User Routes

### 1. Signup

- **Endpoint:** POST `/signup`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "message": "User signed up successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2. Login

- **Endpoint:** POST `/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "yourjsonwebtoken"
}
```

## Post Routes

### 1. Create Post

- **Endpoint:** POST `/create-post`

**Request Body:**

```json
{
  "title": "My First Post",
  "content": "This is the content of my first blog post"
}
```

**Authorization Header:** Bearer Token (JWT token obtained during login)

**Response:**

```json
{
  "message": "Post created successfully",
  "post": {
    "id": 1,
    "title": "My First Post",
    "content": "This is the content of my first blog post",
    "user_id": 1
  }
}
```

### 2. Get My Posts

- **Endpoint:** GET `/my-posts`

**Authorization Header:** Bearer Token (JWT token obtained during login)

**Response:**

```json
{
  "posts": [
    {
      "id": 1,
      "title": "My First Post",
      "content": "This is the content of my first blog post",
      "user_id": 1
    },
    // Additional posts...
  ]
}
```

### 3. Get All Profiles

- **Endpoint:** GET `/profiles`

**Authorization Header:** Bearer Token (JWT token obtained during login)

**Response:**

```json
{
  "profiles": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    // Additional profiles...
  ]
}
```

---
