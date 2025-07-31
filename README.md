# Portfolio Backend API

![Node.js](https://img.shields.io/badge/Node.js-v16+-green) ![Express](https://img.shields.io/badge/Express-v4-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-v5+-yellow) ![JWT](https://img.shields.io/badge/JWT-Authentication-orange) ![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)

A robust, scalable, and secure Node.js backend for a portfolio application, built using the **MVC architecture**. This project powers a dynamic portfolio platform, providing APIs for managing blogs, case studies, projects, mini-projects, contacts, subscriptions, and admin authentication. It leverages modern technologies and best practices to ensure performance, security, and maintainability.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview
This backend serves as the core for a portfolio application, enabling seamless content management and user interaction. It is designed with a focus on **scalability**, **security**, and **maintainability**, adhering to the Model-View-Controller (MVC) pattern. The API supports CRUD operations for various resources, secure admin authentication, and efficient search functionality, making it suitable for a professional portfolio showcase.

## Features
- **Comprehensive CRUD Operations**: Create, read, update, and delete blogs, case studies, projects, mini-projects, contacts, and subscriptions.
- **Secure Authentication**: JWT-based admin authentication with bcrypt password hashing for secure registration and login.
- **Efficient Search**: Case-insensitive search across multiple fields for quick resource retrieval.
- **MongoDB Integration**: Schema-driven data storage with Mongoose for robust data modeling and validation.
- **RESTful API Design**: Well-structured endpoints following REST principles for intuitive integration with frontend applications.
- **Error Handling**: Consistent and secure error responses to enhance user experience and debugging.
- **CORS Support**: Configured to allow cross-origin requests from specified frontend origins.
- **Scalable Architecture**: Modular MVC structure for easy maintenance and feature expansion.
- **Production-Ready**: Deployed on Vercel with environment variable management and automatic scaling.

## Technologies Used
- **Node.js**: Runtime environment for server-side JavaScript execution.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for flexible and scalable data storage.
- **Mongoose**: ODM for MongoDB to enforce schemas and simplify queries.
- **JWT**: JSON Web Tokens for secure authentication.
- **Bcrypt.js**: Password hashing for secure storage.
- **Cookie-Parser**: Middleware for handling cookies in authentication.
- **CORS**: Middleware for enabling cross-origin resource sharing.
- **Vercel**: Hosting platform for serverless deployment.
- **Dotenv**: Environment variable management for secure configuration.
- **ESLint & Prettier**: Code linting and formatting for consistent code quality.

## Architecture
The project follows the **Model-View-Controller (MVC)** architecture to ensure separation of concerns and maintainability:
- **Models**: Define MongoDB schemas and business logic for data operations (e.g., `admin.mongo`, `blogs.mongo`).
- **Controllers**: Handle HTTP requests and responses, interfacing with models (e.g., `blogs.controller.js`).
- **Routes**: Map API endpoints to controller functions (e.g., `blogsRouter.js`).
- **Middleware**: Includes authentication, error handling, and request parsing (e.g., JWT verification, CORS).

This modular structure allows for easy scalability, testing, and maintenance, making it ideal for professional development environments.

## Installation
Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/portfolio-backend.git
   cd portfolio-backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up MongoDB**:
   - Install MongoDB locally or use a cloud provider like MongoDB Atlas.
   - Create a database and note the connection string.

4. **Configure Environment Variables**:
   - Create a `.env` file in the root directory:
     ```env
     MONGO_URI=mongodb://localhost:27017/portfolio
     JWT_SECRET=your_jwt_secret_key
     NODE_ENV=development
     PORT=3000
     ```

5. **Run the Application**:
   ```bash
   npm start
   ```
   - The server will run on `http://localhost:3000` (or the specified `PORT`).

## Configuration
- **Environment Variables**:
  - `MONGO_URI`: MongoDB connection string.
  - `JWT_SECRET`: Secret key for JWT signing.
  - `NODE_ENV`: Set to `development` or `production`.
  - `PORT`: Port for the server (defaults to 3000).
- **CORS**: Configured to allow requests from specified origins (update in `app.js` for production).
- **Database**: MongoDB schemas enforce data validation (e.g., required fields, unique email for admins).

## API Endpoints
The API provides endpoints for managing resources. All routes are prefixed with `/api` unless specified otherwise.

### Authentication (`/api/auth`)
- `POST /register`: Register a new admin (email, password, firstName, lastName, phoneNumber, gender).
- `POST /login`: Authenticate admin and return JWT cookie.
- `GET /check-cookie`: Verify JWT cookie and return user role and ID.
- `POST /logout`: Clear authentication cookie.

### Blogs (`/blogs`)
- `POST /`: Create a new blog (title, subtitle, content, imageUrl).
- `GET /:id`: Get blog by ID.
- `PUT /:id`: Update blog by ID.
- `DELETE /:id`: Delete blog by ID.
- `GET /`: Get all blogs.
- `GET /search?query=<term>`: Search blogs by title, subtitle, or content.

### Case Studies (`/caseStudies`)
- `POST /`: Create a new case study (title, description, client, industry, services, challenge, solution, results, images, demoUrl, githubUrl).
- `GET /:id`: Get case study by ID.
- `PUT /:id`: Update case study by ID.
- `DELETE /:id`: Delete case study by ID.
- `GET /`: Get all case studies.
- `GET /search?query=<term>`: Search case studies by title, description, client, or industry.

### Contacts (`/contact`)
- `POST /`: Create a new contact (name, email, title, message).
- `GET /:id`: Get contact by ID.
- `PUT /:id`: Update contact by ID.
- `DELETE /:id`: Delete contact by ID.
- `GET /`: Get all contacts.
- `GET /search?query=<term>`: Search contacts by name, email, title, or message.

### Mini Projects (`/miniProjects`)
- `POST /`: Create a new mini project (title, description, imageUrl, githubUrl, demoUrl).
- `GET /:id`: Get mini project by ID.
- `PUT /:id`: Update mini project by ID.
- `DELETE /:id`: Delete mini project by ID.
- `GET /`: Get all mini projects.
- `GET /search?query=<term>`: Search mini projects by title or description.

### Projects (`/projects`)
- `POST /`: Create a new project (title, projectOverview, images, problem, solution, techStack).
- `GET /:id`: Get project by ID.
- `PUT /:id`: Update project by ID.
- `DELETE /:id`: Delete project by ID.
- `GET /`: Get all projects.
- `GET /search?query=<term>`: Search projects by title, overview, problem, solution, or techStack.

### Subscriptions (`/subscription`)
- `POST /`: Create a new subscription (email).
- `GET /:id`: Get subscription by ID.
- `PUT /:id`: Update subscription by ID.
- `DELETE /:id`: Delete subscription by ID.
- `GET /`: Get all subscriptions.
- `GET /search?query=<term>`: Search subscriptions by email.

## Authentication
- **Admin Authentication**: Uses JWT stored in an HTTP-only cookie for secure session management.
- **Password Security**: Passwords are hashed using bcrypt with a salt factor of 10.
- **Protected Routes**: Admin-only routes (e.g., create/update/delete) require JWT verification middleware (to be implemented as needed).

## Error Handling
- **Consistent Responses**: All errors return a JSON object with an `error` key (e.g., `{ error: "Message" }`).
- **Status Codes**:
  - `200`: Success.
  - `201`: Resource created.
  - `400`: Bad request (e.g., missing fields).
  - `404`: Resource not found.
  - `500`: Internal server error.
- **Logging**: Errors are logged to the console for debugging (extendable with Winston for production).

## Deployment
The project is deployed on **Vercel** for serverless hosting:
1. **Push to GitHub**:
   ```bash
   git push origin main
   ```
2. **Deploy with Vercel CLI**:
   ```bash
   vercel --prod
   ```
3. **Environment Variables**:
   - Set `MONGO_URI`, `JWT_SECRET`, `NODE_ENV`, and `PORT` in the Vercel dashboard.
4. **Vercel Configuration** (`vercel.json`):
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "index.js"
       }
     ]
   }
   ```

## Testing
- **Manual Testing**: Use Postman or cURL to test API endpoints locally or on the deployed URL.
- **Unit Testing**: Recommended to add Jest and Supertest for automated testing of controllers and routes.
- **Sample Request** (Create Blog):
  ```bash
  curl -X POST http://localhost:3000/blogs \
  -H "Content-Type: application/json" \
  -d '{"title":"My Blog","subtitle":"A subtitle","content":"Blog content","imageUrl":"http://example.com/image.jpg"}'
  ```

## Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request with a detailed description.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For inquiries or feedback, reach out to:
- **Email**: your-email@example.com
- **GitHub**: [your-username](https://github.com/your-username)
- **Portfolio**: [your-portfolio-url](https://your-portfolio-url.com)

---

This backend showcases my expertise in building scalable, secure, and maintainable APIs using Node.js and Express. It reflects industry-standard practices and is optimized for integration with modern frontend frameworks. Thank you for reviewing my work!