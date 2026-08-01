# HireHub API (NestJS)

A production-grade Job Portal REST API built from scratch to demonstrate advanced NestJS expertise, following best practices.

## Overview
This backend powers a complete Job Portal with role-based features for Candidates and Employers.
- **Candidates**: Can browse jobs, apply, and track application status.
- **Employers**: Can post job listings, view applicants, and update applicant statuses.

## Architecture & Technology Stack
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT with Passport.js & bcrypt
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker + docker-compose
- **Testing**: Jest (Unit & E2E)

### Module Architecture (NestJS)
```
[AppModule]
 ├── ConfigModule (Env vars)
 ├── TypeOrmModule (Database)
 ├── AuthModule
 │    └── JwtStrategy & AuthService
 ├── UsersModule
 │    └── UsersController & UsersService
 ├── JobsModule
 │    └── JobsController & JobsService
 └── ApplicationsModule
      └── ApplicationsController & ApplicationsService
```

## Entity Relationship Diagram
```
+----------------+       +---------------+       +---------------------+
|      USER      |       |      JOB      |       |     APPLICATION     |
+----------------+       +---------------+       +---------------------+
| id (UUID)      |1    * | id (UUID)     |1    * | id (UUID)           |
| email          |-------| title         |-------| cover_letter        |
| password       |       | description   |       | status              |
| role           |       | employer_id(FK)       | job_id (FK)         |
| full_name      |1    * | ...           |       | candidate_id (FK)   |
+----------------+-------+---------------+       +---------------------+
```

## Setup Instructions

### Prerequisites
- Node.js v20+
- Docker & Docker Compose

### Running via Docker (Recommended)
1. Rename `.env.example` to `.env`
2. Start the services:
   ```bash
   docker-compose up -d --build
   ```
3. API runs on `http://localhost:3000`
4. Swagger docs on `http://localhost:3000/api/docs`

### Running Locally
1. Start a local PostgreSQL server and update `.env` accordingly.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm run start:dev
   ```

## API Documentation

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| POST | `/api/auth/register` | No | All | Register a new user |
| POST | `/api/auth/login` | No | All | Login and receive JWT |
| GET | `/api/users/profile` | Yes | All | Get current user profile |
| PATCH | `/api/users/profile` | Yes | All | Update user profile |
| POST | `/api/jobs` | Yes | EMPLOYER | Create a job listing |
| GET | `/api/jobs` | No | All | List jobs (with pagination & filters) |
| GET | `/api/jobs/:id` | No | All | Get single job details |
| PATCH | `/api/jobs/:id` | Yes | EMPLOYER | Update owned job |
| DELETE| `/api/jobs/:id` | Yes | EMPLOYER | Soft delete owned job |
| POST | `/api/applications/:jobId` | Yes | CANDIDATE | Apply for a job |
| GET | `/api/applications/my` | Yes | CANDIDATE | List user's applications |
| GET | `/api/applications/job/:jobId` | Yes | EMPLOYER | List applications for a job |
| PATCH | `/api/applications/:id/status`| Yes | EMPLOYER | Update application status |

## Design Decisions
- **NestJS over Express**: NestJS offers a structured, out-of-the-box scalable architecture via dependency injection. It enforces good practices and allows developers to easily organize code by features.
- **TypeORM**: Integrates smoothly with NestJS through `@nestjs/typeorm`. It enables using TypeScript classes as database schemas and easily maintains relations.
- **Guards & Decorators**: JWT authentication is implemented using NestJS Guards and custom decorators (`@Roles`) which perfectly adheres to DRY principles.
- **Global Pipes**: Class-validator runs globally via NestJS `ValidationPipe`, ensuring no invalid payload reaches our controllers.
- **Soft Deletion for Jobs**: Instead of hard-deleting records which could break relations (like applications referring to a job), updating the job status to `CLOSED` is cleaner.
