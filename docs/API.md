# Sales Management CRM - API Documentation

Complete REST API documentation for the Sales Management CRM backend.

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Base URL](#base-url)
3. [Auth Endpoints](#auth-endpoints)
4. [User Endpoints](#user-endpoints)
5. [Customer Endpoints](#customer-endpoints)
6. [Activity Endpoints](#activity-endpoints)
7. [Lead Endpoints](#lead-endpoints)
8. [Opportunity Endpoints](#opportunity-endpoints)
9. [Campaign Endpoints](#campaign-endpoints)
10. [Product Endpoints](#product-endpoints)
11. [Error Handling](#error-handling)

## 🔐 Authentication

All endpoints (except login and register) require JWT authentication.

### Headers
```
Authorization: Bearer <token>
Content-Type: application/json
```

### Getting Token
1. POST to `/api/auth/login` with email and password
2. Receive JWT token in response
3. Include token in Authorization header for all requests
4. Token expires after 24 hours

## 📍 Base URL

```
http://localhost:5000/api
```

---

## 🔑 Auth Endpoints

### Login
```http
POST /auth/login
```

**Request:**
```json
{
  "email": "rep@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Sales",
    "email": "rep@example.com",
    "role": "Sales Representative",
    "department": "Sales"
  }
}
```

### Get Current User
```http
GET /auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Sales",
    "email": "rep@example.com",
    "role": "Sales Representative",
    "department": "Sales"
  }
}
```

### Logout
```http
POST /auth/logout
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 👥 User Endpoints

### List All Users
```http
GET /users
```

**Query Parameters:**
```
page=1&limit=10&role=Sales Representative&search=John
```

**Response (200):**
```json
{
  "success": true,
  "count": 6,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Sales",
      "email": "rep@example.com",
      "role": "Sales Representative",
      "phone": "555-0101",
      "department": "Sales",
      "status": "active",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalCount": 6
  }
}
```

### Get User by ID
```http
GET /users/:id
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Sales",
    "email": "rep@example.com",
    "role": "Sales Representative",
    "phone": "555-0101",
    "department": "Sales",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Create User
```http
POST /users
```

**Request:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "securePassword123",
  "role": "Sales Representative",
  "phone": "555-0102",
  "department": "Sales"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "Sales Representative",
    "phone": "555-0102",
    "department": "Sales",
    "status": "active"
  }
}
```

### Update User
```http
PUT /users/:id
```

**Request:**
```json
{
  "name": "Jane Smith Updated",
  "phone": "555-0103"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith Updated",
    "email": "jane@example.com",
    "role": "Sales Representative",
    "phone": "555-0103",
    "department": "Sales"
  }
}
```

### Delete User
```http
DELETE /users/:id
```

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## 👤 Customer Endpoints

### List Customers
```http
GET /customers
```

**Query Parameters:**
```
page=1&limit=10&search=Acme&status=active&sortBy=name
```

**Response (200):**
```json
{
  "success": true,
  "count": 20,
  "customers": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Acme Corp",
      "email": "contact@acme.com",
      "phone": "555-1234",
      "company": "Acme Corp",
      "industry": "Technology",
      "location": "New York",
      "status": "active",
      "assignedTo": "507f1f77bcf86cd799439001",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalCount": 20
  }
}
```

### Get Customer
```http
GET /customers/:id
```

**Response (200):**
```json
{
  "success": true,
  "customer": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Acme Corp",
    "email": "contact@acme.com",
    "phone": "555-1234",
    "company": "Acme Corp",
    "industry": "Technology",
    "location": "New York",
    "address": "123 Main St, New York, NY 10001",
    "status": "active",
    "assignedTo": {
      "_id": "507f1f77bcf86cd799439001",
      "name": "John Sales"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:15:00Z"
  }
}
```

### Create Customer
```http
POST /customers
```

**Request:**
```json
{
  "name": "TechStart Inc",
  "email": "info@techstart.com",
  "phone": "555-5678",
  "company": "TechStart Inc",
  "industry": "Software",
  "location": "San Francisco",
  "address": "456 Tech Ave, SF, CA 94105"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Customer created successfully",
  "customer": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "TechStart Inc",
    "email": "info@techstart.com",
    "phone": "555-5678",
    "company": "TechStart Inc",
    "industry": "Software",
    "location": "San Francisco",
    "status": "active"
  }
}
```

### Update Customer
```http
PUT /customers/:id
```

**Request:**
```json
{
  "phone": "555-5679",
  "status": "inactive"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Customer updated successfully",
  "customer": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "TechStart Inc",
    "email": "info@techstart.com",
    "phone": "555-5679",
    "status": "inactive"
  }
}
```

### Delete Customer
```http
DELETE /customers/:id
```

**Response (200):**
```json
{
  "success": true,
  "message": "Customer deleted successfully"
}
```

---

## 📅 Activity Endpoints

### List Activities
```http
GET /activities
```

**Query Parameters:**
```
page=1&limit=10&type=Call&status=completed&customerId=507f1f77bcf86cd799439011
```

**Response (200):**
```json
{
  "success": true,
  "count": 30,
  "activities": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "type": "Call",
      "title": "Sales call with Acme",
      "description": "Discussed Q1 requirements",
      "status": "completed",
      "customerId": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439001",
      "duration": 30,
      "date": "2024-01-20T14:00:00Z",
      "createdAt": "2024-01-20T14:15:00Z"
    }
  ]
}
```

### Create Activity
```http
POST /activities
```

**Request:**
```json
{
  "type": "Meeting",
  "title": "Quarterly Business Review",
  "description": "Reviewed KPIs and next quarter goals",
  "customerId": "507f1f77bcf86cd799439011",
  "duration": 60,
  "date": "2024-01-25T10:00:00Z",
  "status": "planned"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Activity created successfully",
  "activity": {
    "_id": "507f1f77bcf86cd799439021",
    "type": "Meeting",
    "title": "Quarterly Business Review",
    "description": "Reviewed KPIs and next quarter goals",
    "customerId": "507f1f77bcf86cd799439011",
    "duration": 60,
    "status": "planned",
    "date": "2024-01-25T10:00:00Z"
  }
}
```

### Update Activity
```http
PUT /activities/:id
```

**Request:**
```json
{
  "status": "completed",
  "description": "Reviewed KPIs and next quarter goals. Client approved budget."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Activity updated successfully",
  "activity": {
    "_id": "507f1f77bcf86cd799439021",
    "type": "Meeting",
    "status": "completed",
    "description": "Reviewed KPIs and next quarter goals. Client approved budget."
  }
}
```

### Delete Activity
```http
DELETE /activities/:id
```

**Response (200):**
```json
{
  "success": true,
  "message": "Activity deleted successfully"
}
```

---

## 🎯 Opportunity Endpoints

### List Opportunities
```http
GET /opportunities
```

**Query Parameters:**
```
page=1&limit=10&stage=Proposal&status=active&customerId=507f1f77bcf86cd799439011
```

**Response (200):**
```json
{
  "success": true,
  "count": 20,
  "opportunities": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "title": "Acme Q1 License Renewal",
      "customerId": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439001",
      "amount": 50000,
      "stage": "Proposal",
      "probability": 75,
      "expectedCloseDate": "2024-02-28",
      "status": "active",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Create Opportunity
```http
POST /opportunities
```

**Request:**
```json
{
  "title": "TechStart Enterprise Package",
  "customerId": "507f1f77bcf86cd799439013",
  "amount": 75000,
  "stage": "Qualification",
  "probability": 50,
  "expectedCloseDate": "2024-03-31",
  "description": "Enterprise package with custom integrations"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Opportunity created successfully",
  "opportunity": {
    "_id": "507f1f77bcf86cd799439031",
    "title": "TechStart Enterprise Package",
    "customerId": "507f1f77bcf86cd799439013",
    "amount": 75000,
    "stage": "Qualification",
    "probability": 50,
    "expectedCloseDate": "2024-03-31",
    "status": "active"
  }
}
```

### Update Opportunity
```http
PUT /opportunities/:id
```

**Request:**
```json
{
  "stage": "Proposal",
  "probability": 75,
  "amount": 80000
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Opportunity updated successfully",
  "opportunity": {
    "_id": "507f1f77bcf86cd799439031",
    "title": "TechStart Enterprise Package",
    "stage": "Proposal",
    "probability": 75,
    "amount": 80000
  }
}
```

---

## 🚀 Campaign Endpoints

### List Campaigns
```http
GET /campaigns
```

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "campaigns": [
    {
      "_id": "507f1f77bcf86cd799439040",
      "name": "Q1 Product Launch",
      "description": "Launch new enterprise product",
      "status": "active",
      "budget": 50000,
      "spend": 35000,
      "startDate": "2024-01-01",
      "endDate": "2024-03-31",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Create Campaign
```http
POST /campaigns
```

**Request:**
```json
{
  "name": "Q2 Partnership Campaign",
  "description": "Partner co-marketing campaign",
  "budget": 60000,
  "startDate": "2024-04-01",
  "endDate": "2024-06-30"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Campaign created successfully",
  "campaign": {
    "_id": "507f1f77bcf86cd799439041",
    "name": "Q2 Partnership Campaign",
    "budget": 60000,
    "status": "active"
  }
}
```

---

## ⚠️ Error Handling

All errors follow this format:

**Response (400/401/403/404/500):**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

### Common Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 400 | Bad Request | Invalid request format or validation error |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | Insufficient permissions for this action |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists (duplicate) |
| 500 | Internal Server Error | Server error |

### Example Error Response

```json
{
  "success": false,
  "message": "Validation error",
  "error": "Email is required and must be valid"
}
```

---

## 📝 Request/Response Examples

### Example: Complete Customer CRUD Flow

**1. Create Customer**
```bash
curl -X POST http://localhost:5000/api/customers \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Corp",
    "email": "contact@newcorp.com",
    "phone": "555-9999",
    "company": "New Corp",
    "industry": "Finance",
    "location": "Boston"
  }'
```

**2. Read Customer**
```bash
curl -X GET http://localhost:5000/api/customers/507f1f77bcf86cd799439013 \
  -H "Authorization: Bearer <token>"
```

**3. Update Customer**
```bash
curl -X PUT http://localhost:5000/api/customers/507f1f77bcf86cd799439013 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "555-8888",
    "status": "inactive"
  }'
```

**4. Delete Customer**
```bash
curl -X DELETE http://localhost:5000/api/customers/507f1f77bcf86cd799439013 \
  -H "Authorization: Bearer <token>"
```

---

## 🔄 Pagination

All list endpoints support pagination:

**Query Parameters:**
```
page=1       # Page number (default: 1)
limit=10     # Items per page (default: 10, max: 100)
sort=name    # Sort field
order=asc    # Sort order: asc or desc
```

**Response Pagination:**
```json
{
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalCount": 25,
    "hasMore": true
  }
}
```

---

**For complete setup instructions, see [SETUP.md](./SETUP.md)**

**For feature documentation, see [FEATURES.md](./FEATURES.md)**
