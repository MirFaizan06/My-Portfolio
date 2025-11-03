# API Documentation

Complete API reference for the Portfolio Website backend.

## Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [Common Response Format](#common-response-format)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Endpoints](#endpoints)
  - [Health Check](#health-check)
  - [Authentication](#authentication-endpoints)
  - [Projects](#projects)
  - [Pricing](#pricing)
  - [Services](#services)
  - [Resume](#resume)
  - [Contact Details](#contact-details)
  - [Upload](#upload)
  - [Version](#version)

## Base URL

### Development
```
http://localhost:5000/api
```

### Production
```
https://server-the-nxt-lvls-projects.vercel.app/api
```

## Authentication

### JWT Authentication

Protected endpoints require a JWT token obtained from Google OAuth login.

**Header Format:**
```
Authorization: Bearer <your-jwt-token>
```

**Token Payload:**
```json
{
  "uid": "user-id",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234567890
}
```

**Admin Access:**
Only users with email `mirfaizan8803@gmail.com` have admin privileges for write operations.

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message description"
}
```

Or:
```json
{
  "error": {
    "message": "Error message description"
  }
}
```

## Error Handling

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request parameters |
| 401 | Unauthorized - Invalid or missing authentication |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

### Common Error Messages

- `"Authentication required"` - Missing or invalid JWT token
- `"Unauthorized access"` - User not authorized for this action
- `"Failed to fetch {resource}"` - Database query failed
- `"Failed to create {resource}"` - Creation failed
- `"Failed to update {resource}"` - Update failed
- `"Failed to delete {resource}"` - Deletion failed
- `"{Resource} not found"` - Resource doesn't exist

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing for production:
- Public endpoints: 100 requests/15 minutes per IP
- Authenticated endpoints: 1000 requests/15 minutes per user

## Endpoints

---

## Health Check

### Check Server Status

**GET** `/api/health`

Check if the server is running.

**Authentication:** None required

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

## Authentication Endpoints

### Google OAuth Login

**POST** `/api/auth/google`

Authenticate user with Google OAuth token and receive JWT.

**Authentication:** None required

**Request Body:**
```json
{
  "token": "google-oauth-id-token"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": {
      "uid": "user-id",
      "email": "user@example.com",
      "displayName": "User Name",
      "photoURL": "https://..."
    }
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid token"
}
```

### Verify Token

**GET** `/api/auth/verify`

Verify if JWT token is valid.

**Authentication:** Required (JWT)

**Response:**
```json
{
  "success": true,
  "data": {
    "uid": "user-id",
    "email": "user@example.com"
  }
}
```

---

## Projects

### Get All Projects

**GET** `/api/projects`

Retrieve all projects sorted by creation date (newest first).

**Authentication:** None required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "project-id-1",
      "name": "E-commerce Platform",
      "description": "Full-stack e-commerce solution with React and Node.js",
      "techStack": ["React", "Node.js", "MongoDB", "Stripe"],
      "image": "https://example.com/project-image.jpg",
      "liveLink": "https://project-live.com",
      "githubLink": "https://github.com/user/repo",
      "featured": true,
      "createdAt": "2025-11-03T10:00:00.000Z",
      "updatedAt": "2025-11-03T10:00:00.000Z"
    }
  ]
}
```

### Get Project By ID

**GET** `/api/projects/:id`

Retrieve a specific project by ID.

**Authentication:** None required

**URL Parameters:**
- `id` (string, required) - Project ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "project-id-1",
    "name": "E-commerce Platform",
    /* ... full project data */
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Project not found"
}
```

### Create Project

**POST** `/api/projects`

Create a new project.

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Project description",
  "techStack": ["React", "Node.js"],
  "image": "https://example.com/image.jpg",
  "liveLink": "https://project.com",
  "githubLink": "https://github.com/user/repo",
  "featured": false
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "new-project-id",
    "name": "New Project",
    /* ... full project data with timestamps */
  }
}
```

### Update Project

**PUT** `/api/projects/:id`

Update an existing project.

**Authentication:** Required (Admin only)

**URL Parameters:**
- `id` (string, required) - Project ID

**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  /* ... any fields to update */
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "project-id",
    /* ... updated project data */
  }
}
```

### Delete Project

**DELETE** `/api/projects/:id`

Delete a project.

**Authentication:** Required (Admin only)

**URL Parameters:**
- `id` (string, required) - Project ID

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## Pricing

### Get All Pricing Plans

**GET** `/api/pricing`

Retrieve all pricing plans sorted by price (low to high).

**Authentication:** None required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "pricing-id-1",
      "name": "Starter",
      "price": "99",
      "period": "project",
      "description": "Perfect for small projects and startups",
      "features": [
        "Responsive Design",
        "Basic SEO Optimization",
        "3 Revisions",
        "1 Month Support"
      ],
      "popular": false,
      "color": "from-blue-500 to-cyan-500",
      "createdAt": "2025-11-03T10:00:00.000Z",
      "updatedAt": "2025-11-03T10:00:00.000Z"
    },
    {
      "id": "pricing-id-2",
      "name": "Professional",
      "price": "299",
      "period": "project",
      "description": "Ideal for growing businesses",
      "features": [
        "Everything in Starter",
        "Advanced SEO",
        "Unlimited Revisions",
        "3 Months Support",
        "Performance Optimization"
      ],
      "popular": true,
      "color": "from-purple-500 to-pink-500",
      "createdAt": "2025-11-03T10:00:00.000Z",
      "updatedAt": "2025-11-03T10:00:00.000Z"
    }
  ]
}
```

### Get Pricing Plan By ID

**GET** `/api/pricing/:id`

Retrieve a specific pricing plan.

**Authentication:** None required

**URL Parameters:**
- `id` (string, required) - Pricing plan ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "pricing-id-1",
    "name": "Starter",
    /* ... full pricing data */
  }
}
```

### Create Pricing Plan

**POST** `/api/pricing`

Create a new pricing plan.

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "name": "Enterprise",
  "price": "999",
  "period": "project",
  "description": "For large-scale applications",
  "features": [
    "Everything in Professional",
    "Custom Solutions",
    "Dedicated Support",
    "1 Year Maintenance"
  ],
  "popular": false,
  "color": "from-orange-500 to-red-500"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "new-pricing-id",
    /* ... full pricing data */
  }
}
```

### Update Pricing Plan

**PUT** `/api/pricing/:id`

Update a pricing plan.

**Authentication:** Required (Admin only)

**URL Parameters:**
- `id` (string, required) - Pricing plan ID

**Request Body:**
```json
{
  "price": "1099",
  "features": [/* updated features */]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "pricing-id",
    /* ... updated data */
  }
}
```

### Delete Pricing Plan

**DELETE** `/api/pricing/:id`

Delete a pricing plan.

**Authentication:** Required (Admin only)

**URL Parameters:**
- `id` (string, required) - Pricing plan ID

**Response:**
```json
{
  "success": true,
  "message": "Pricing plan deleted successfully"
}
```

---

## Services

### Get All Services

**GET** `/api/services`

Retrieve all additional services.

**Authentication:** None required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "service-id-1",
      "service": "API Integration",
      "priceUSD": 150,
      "turnaround": "3-5 days",
      "isStartingPrice": true,
      "isMonthly": false,
      "createdAt": "2025-11-03T10:00:00.000Z",
      "updatedAt": "2025-11-03T10:00:00.000Z"
    }
  ]
}
```

### Create Service

**POST** `/api/services`

Create a new service.

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "service": "Custom Dashboard",
  "priceUSD": 500,
  "turnaround": "1-2 weeks",
  "isStartingPrice": true,
  "isMonthly": false
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "new-service-id",
    /* ... full service data */
  }
}
```

### Update Service

**PUT** `/api/services/:id`

Update a service.

**Authentication:** Required (Admin only)

**URL Parameters:**
- `id` (string, required) - Service ID

**Request Body:**
```json
{
  "priceUSD": 550,
  "turnaround": "1 week"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "service-id",
    /* ... updated data */
  }
}
```

### Delete Service

**DELETE** `/api/services/:id`

Delete a service.

**Authentication:** Required (Admin only)

**URL Parameters:**
- `id` (string, required) - Service ID

**Response:**
```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

---

## Resume

Resume API handles experiences, education, skills, and certifications.

### Experiences

#### Get All Experiences

**GET** `/api/resume/experiences`

**Authentication:** None required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "exp-id-1",
      "title": "Senior Full Stack Developer",
      "company": "Tech Corp",
      "location": "Remote",
      "startDate": "2022-01",
      "endDate": "Present",
      "current": true,
      "description": "Led development of microservices architecture...",
      "achievements": [
        "Reduced API response time by 40%",
        "Implemented CI/CD pipeline"
      ],
      "createdAt": "2025-11-03T10:00:00.000Z"
    }
  ]
}
```

#### Get Experience By ID

**GET** `/api/resume/experiences/:id`

**Authentication:** None required

#### Create Experience

**POST** `/api/resume/experiences`

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "title": "Full Stack Developer",
  "company": "Startup Inc",
  "location": "New York, NY",
  "startDate": "2020-06",
  "endDate": "2022-01",
  "current": false,
  "description": "Developed web applications...",
  "achievements": [
    "Built 5+ production apps",
    "Mentored junior developers"
  ]
}
```

#### Update Experience

**PUT** `/api/resume/experiences/:id`

**Authentication:** Required (Admin only)

#### Delete Experience

**DELETE** `/api/resume/experiences/:id`

**Authentication:** Required (Admin only)

### Education

#### Get All Education

**GET** `/api/resume/education`

**Authentication:** None required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "edu-id-1",
      "degree": "Bachelor of Science in Computer Science",
      "institution": "University Name",
      "location": "City, Country",
      "startDate": "2016-09",
      "endDate": "2020-05",
      "gpa": "3.8/4.0",
      "achievements": [
        "Dean's List",
        "Best Project Award"
      ],
      "createdAt": "2025-11-03T10:00:00.000Z"
    }
  ]
}
```

#### Create Education

**POST** `/api/resume/education`

**Authentication:** Required (Admin only)

#### Update Education

**PUT** `/api/resume/education/:id`

**Authentication:** Required (Admin only)

#### Delete Education

**DELETE** `/api/resume/education/:id`

**Authentication:** Required (Admin only)

### Skills

#### Get All Skills

**GET** `/api/resume/skills`

**Authentication:** None required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "skill-id-1",
      "name": "React",
      "category": "Frontend",
      "level": "Expert",
      "yearsOfExperience": 5,
      "createdAt": "2025-11-03T10:00:00.000Z"
    }
  ]
}
```

#### Create Skill

**POST** `/api/resume/skills`

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "name": "Node.js",
  "category": "Backend",
  "level": "Advanced",
  "yearsOfExperience": 4
}
```

#### Update Skill

**PUT** `/api/resume/skills/:id`

**Authentication:** Required (Admin only)

#### Delete Skill

**DELETE** `/api/resume/skills/:id`

**Authentication:** Required (Admin only)

### Certifications

#### Get All Certifications

**GET** `/api/resume/certifications`

**Authentication:** None required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cert-id-1",
      "name": "AWS Certified Solutions Architect",
      "issuer": "Amazon Web Services",
      "issueDate": "2023-06",
      "expiryDate": "2026-06",
      "credentialId": "ABC123XYZ",
      "credentialUrl": "https://aws.amazon.com/verify/ABC123",
      "createdAt": "2025-11-03T10:00:00.000Z"
    }
  ]
}
```

#### Create Certification

**POST** `/api/resume/certifications`

**Authentication:** Required (Admin only)

#### Update Certification

**PUT** `/api/resume/certifications/:id`

**Authentication:** Required (Admin only)

#### Delete Certification

**DELETE** `/api/resume/certifications/:id`

**Authentication:** Required (Admin only)

---

## Contact Details

### Get Contact Details

**GET** `/api/contact-details`

Retrieve contact information (email, phone, location, social links).

**Authentication:** None required

**Response:**
```json
{
  "success": true,
  "data": {
    "email": "mirfaizan8803@gmail.com",
    "phone": "+91 XXX XXXXXXX",
    "location": "India",
    "socialLinks": {
      "github": "https://github.com/mirfaizan8803",
      "linkedin": "https://linkedin.com/in/mirfaizan",
      "twitter": "https://twitter.com/mirfaizan"
    },
    "updatedAt": "2025-11-03T10:00:00.000Z"
  }
}
```

### Update Contact Details

**PUT** `/api/contact-details`

Update contact information.

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "phone": "+1 234 567 8900",
  "location": "United States",
  "socialLinks": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "twitter": "https://twitter.com/username"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    /* ... updated contact details */
  }
}
```

---

## Upload

### Upload File

**POST** `/api/upload`

Upload a file (image, document, etc.).

**Authentication:** Required (Admin only)

**Content-Type:** `multipart/form-data`

**Request Body:**
- `file` (file, required) - File to upload

**Example (using FormData):**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('/api/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
})
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://storage.googleapis.com/bucket/filename.jpg",
    "filename": "filename.jpg",
    "size": 123456,
    "mimetype": "image/jpeg"
  }
}
```

### Delete File

**DELETE** `/api/upload/:filename`

Delete an uploaded file.

**Authentication:** Required (Admin only)

**URL Parameters:**
- `filename` (string, required) - File name to delete

**Response:**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

---

## Version

### Get Version

**GET** `/api/version`

Get current site version.

**Authentication:** None required

**Response:**
```json
{
  "success": true,
  "data": {
    "version": "1.0.0",
    "lastUpdated": "2025-11-03T10:00:00.000Z"
  }
}
```

### Update Version

**POST** `/api/version`

Update site version.

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "version": "1.1.0"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "version": "1.1.0",
    "lastUpdated": "2025-11-03T10:00:00.000Z"
  }
}
```

---

## Testing with cURL

### Public Endpoint Example
```bash
curl https://server-the-nxt-lvls-projects.vercel.app/api/projects
```

### Authenticated Endpoint Example
```bash
curl -X POST https://server-the-nxt-lvls-projects.vercel.app/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token" \
  -d '{
    "name": "Test Project",
    "description": "Testing API",
    "techStack": ["React"]
  }'
```

---

## Postman Collection

You can create a Postman collection with these endpoints. Set up environment variables:

- `baseUrl`: `https://server-the-nxt-lvls-projects.vercel.app/api`
- `token`: Your JWT token

Then use `{{baseUrl}}` and `{{token}}` in your requests.

---

**Last Updated:** November 3, 2025
