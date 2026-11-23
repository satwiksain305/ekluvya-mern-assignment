
# Ekluvya API Documentation

## Base URL
http://localhost:5000

## 1. Bulk User Import

**Method:** POST

**Endpoint:** `/api/users/import`

**Description:** Fetches users from JSONPlaceholder and imports them into MongoDB.

**Request Body:** None

**Expected Response:**
- success
- totalFetched
- imported
- skipped
- credentials (one-time for newly imported users)

## 2. User Login

**Method:** POST

**Endpoint:** `/api/auth/login`

**Request Body:**

```json
{
  "name": "Leanne Graham",
  "password": "GENERATED_PASSWORD"
}
```

**Description:** Validates user credentials and returns a JWT token.

## 3. Get Current User

**Method:** GET

**Endpoint:** `/api/auth/me`

**Headers:**

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

**Description:** Returns the authenticated user's profile details.

**Authentication:** Required.

## External API

https://jsonplaceholder.typicode.com/users

## Security

- bcrypt password hashing
- JWT authentication
- Protected profile endpoint
- Environment-based secrets
