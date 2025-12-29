# Nusarupa Backend API

A comprehensive CRUD API built with Express, TypeScript, and Supabase for the Nusarupa community platform.

## Features

- 🔐 **Authentication**: JWT-based auth with Supabase
- 👥 **User Management**: Profile CRUD operations with role-based access
- 🛡️ **Security**: Role-based access control (admin, moderator, user)
- 📊 **Pagination**: Built-in pagination for list endpoints
- ✅ **Validation**: Request validation middleware
- 🚫 **Error Handling**: Comprehensive error handling and logging
- 🌐 **CORS**: Configurable CORS for frontend integration
- 📝 **Documentation**: Complete API documentation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Validation**: Custom middleware
- **Environment**: dotenv

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env
   ```

   Fill in your Supabase credentials in the `.env` file:

   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   PORT=3001
   NODE_ENV=development
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### Base URL

```
http://localhost:3001/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

#### Update User Role (Admin Only)

```http
PATCH /api/auth/users/:userId/role
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "moderator"
}
```

### Profile Endpoints

#### Get Profile by ID (Public)

```http
GET /api/profiles/:id
```

#### Get All Profiles (Admin/Moderator Only)

```http
GET /api/profiles?page=1&limit=10&search=john&sortBy=created_at&sortOrder=desc
Authorization: Bearer <token>
```

#### Get My Profile

```http
GET /api/profiles/me/profile
Authorization: Bearer <token>
```

#### Update Profile

```http
PUT /api/profiles/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "John Updated",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

#### Delete Profile (Admin Only)

```http
DELETE /api/profiles/:id
Authorization: Bearer <admin_token>
```

#### Get User Statistics (Admin Only)

```http
GET /api/profiles/admin/stats
Authorization: Bearer <admin_token>
```

### System Endpoints

#### Health Check

```http
GET /api/health
```

#### API Information

```http
GET /api/
```

## Authentication

The API uses JWT tokens for authentication via Supabase Auth. Include the token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

### User Roles

- **user**: Basic user access
- **moderator**: Can view all profiles and manage content
- **admin**: Full access including user management and statistics

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "message": "Additional context"
}
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate data)
- `500` - Internal Server Error

## Database Schema

### Tables

#### profiles

- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `full_name` (text)
- `avatar_url` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### user_roles

- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `role` (enum: 'admin', 'moderator', 'user')
- `created_at` (timestamp)

## Middleware

### Authentication Middleware

- `authenticateToken`: Validates JWT tokens
- `requireRole(roles)`: Role-based access control
- `requireAdmin`: Admin-only access
- `requireModeratorOrAdmin`: Admin or moderator access

### Validation Middleware

- `validateRegister`: Validates registration data
- `validateLogin`: Validates login data
- `validateProfileUpdate`: Validates profile update data

## Error Handling

The API includes comprehensive error handling for:

- Authentication failures
- Authorization errors
- Validation errors
- Database constraint violations
- CORS errors
- Server errors

## Development

### Scripts

```bash
# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Clean build directory
npm run clean
```

### Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Supabase configuration
│   ├── controllers/
│   │   ├── auth.controller.ts   # Authentication logic
│   │   ├── profile.controller.ts # Profile CRUD logic
│   │   └── index.ts            # Controller exports
│   ├── middleware/
│   │   ├── auth.ts             # Authentication middleware
│   │   └── validation.ts       # Request validation
│   ├── routes/
│   │   ├── auth.ts             # Auth routes
│   │   ├── profiles.ts         # Profile routes
│   │   └── index.ts            # Route configuration
│   ├── types/
│   │   ├── database.types.ts   # Database types
│   │   └── index.ts            # Type exports
│   ├── utils/
│   │   └── response.ts         # Response utilities
│   └── server.ts               # Main server file
├── .env.example               # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## Integration with Frontend

### CORS Configuration

The backend is configured to accept requests from:

- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (React dev server)
- Additional origins can be configured via `ALLOWED_ORIGINS` environment variable

### Environment Variables for Frontend

Set these in your frontend `.env` file:

```env
VITE_API_URL=http://localhost:3001/api
```

## Testing

You can test the API using tools like:

- Postman
- Insomnia
- curl
- Thunder Client (VSCode extension)

Example curl commands are provided in the API documentation above.

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **CORS**: Configured to only allow specified origins
3. **Authentication**: JWT tokens with Supabase
4. **Role-based Access**: Strict role checking
5. **Input Validation**: All inputs are validated
6. **Error Handling**: Sensitive information is not exposed in production

## Deployment

### Environment Setup

1. Set production environment variables
2. Configure production CORS origins
3. Use production Supabase project
4. Set `NODE_ENV=production`

### Build and Deploy

```bash
npm run build
npm start
```

## Support

For issues and questions:

1. Check the API documentation above
2. Review the error messages
3. Check Supabase dashboard for database issues
4. Verify environment variables are correctly set

## License

ISC License
