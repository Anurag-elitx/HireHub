# HireHub

HireHub is a robust Job Portal backend built with [NestJS](https://nestjs.com/) and [PostgreSQL](https://www.postgresql.org/). It provides a complete set of RESTful APIs for employers to post jobs and candidates to apply for them, complete with role-based authentication and database integration via TypeORM.

## Features

- **Authentication & Authorization**: Secure JWT-based authentication with role-based access control (CANDIDATE and EMPLOYER roles).
- **Job Management**: Employers can create, update, delete, and list job postings. Includes filtering and pagination for job searches.
- **Application Tracking**: Candidates can apply to jobs with cover letters, and employers can manage and update the status of these applications.
- **User Profiles**: Profile management for candidates and employers.
- **API Documentation**: Interactive API documentation via Swagger.
- **Containerized**: Ready to use with Docker and Docker Compose for easy setup and deployment.

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL (with TypeORM)
- **Authentication**: Passport.js + JWT + bcrypt
- **Validation**: class-validator & class-transformer
- **Containerization**: Docker & Docker Compose

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Docker](https://www.docker.com/) and Docker Compose (if running via Docker)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Anurag-elitx/HireHub.git
   cd HireHub/hirehub-api-nestjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Copy the `.env.example` file to `.env` and update the values as needed.
   ```bash
   cp .env.example .env
   ```

### Running the Application

**Using Docker (Recommended)**

To start both the PostgreSQL database and the NestJS application:

```bash
docker-compose up -d --build
```
The API will be available at `http://localhost:3000`.

**Running Locally (Without Docker)**

If you have a local PostgreSQL instance running, update your `.env` file with your database credentials.

1. Start the development server:
   ```bash
   npm run start:dev
   ```

## API Documentation

Once the application is running, you can access the Swagger UI documentation to explore and test the available endpoints. Typically, this is mounted at `http://localhost:3000/api` or `http://localhost:3000/docs`.

## Project Structure

- `src/auth/` - Authentication and JWT strategies
- `src/users/` - User profiles and management
- `src/jobs/` - Job listings and search functionality
- `src/applications/` - Job applications and status tracking
- `src/common/` - Global filters, interceptors, and guards

## Contributing

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

Distributed under the MIT License.