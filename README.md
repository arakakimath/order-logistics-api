# Order Logistics API 🚛  

The **Order Logistics API** is the final challenge of Rocketseat's Node.js course, designed for managing deliveries in a fictional company called **FastFeet**. It provides features for **user authentication**, **order tracking**, **delivery management**, and **recipient notifications**, following best practices like **Clean Architecture, DDD, and TDD**.  

The project is built with **NestJS, TypeScript, MongoDB**, and **Docker**, ensuring **scalability and maintainability**. It uses **JWT authentication** with **public/private key encryption**, and the infrastructure is deployed using **AWS AppRunner** with a fully automated **CI/CD pipeline**.  

The API supports **role-based access control**, allowing **admins to manage deliveries** while **delivery personnel handle pickups and drop-offs**. It also includes a robust **testing suite** and **Swagger documentation** for easy integration.

## 📌 Table of Contents

- [🔍 About the Project](#about)  
- [🚀 Technologies](#technologies)  
- [⚙️ Getting Started](#getting-started)  
- [🔑 Environment Variables](#env-vars)  
- [✅ Functional Requirements](#functional-requirements)  
- [📜 Business Rules](#business-rules)
- [🧪 Running Tests](#running-tests)  
- [🔗 API Endpoints](#api-endpoints)  
- [🤝 Contributing](#contributing)  
- [📜 License](#license)  
- [📩 Contact](#contact)  

---

## 🔍 About the Project <a id="about"></a> 

The Order Logistics API is a system designed to manage deliveries for a fictitious company called FastFeet. It allows administrators to manage orders, delivery personnel, and recipients while providing delivery personnel with tools to track and complete deliveries efficiently.

The API includes authentication, role-based access control, order tracking, and notifications for recipients when an order's status changes.

## 🚀 Technologies <a id="technologies"></a> 

### **Tech Stack & Tools**

- **🟢 NestJS (Express)** – Modular and structured Node.js framework for building efficient and scalable server-side applications.  
- **📌 TypeScript** – Statically typed JavaScript for enhanced code quality and maintainability.  
- **🍃 MongoDB + Mongoose** – NoSQL database with a schema-based ORM for flexible and scalable data persistence.  
- **🐳 Docker** – Containerized infrastructure for consistent development and deployment environments.  
- **📦 Clean Architecture** – Separation of concerns for a modular, testable, and scalable codebase.  
- **🔐 JWT Authentication (ES256)** – Secure user authentication using private/public key encryption and ECDSA algorithm.  
- **🛡️ Zod** – Schema-based validation for environment variables, request body, query, and params.  
- **🧪 Vitest + Supertest** – Unit and integration testing for ensuring API reliability and robustness.  
- **📝 ESLint** – Code formatting and linting for maintaining consistent code quality.  
- **🔑 bcryptjs** – Password hashing and comparison for secure authentication.  
- **📄 Swagger** – API documentation for easy testing and integration.  
- **🚀 Semantic Release** – Automated versioning and changelog generation for streamlined releases.  
- **🔗 OAuth 2.0 with GitHub** – Secure authentication via GitHub using OAuth 2.0 for user login.

### **Infrastructure & Deployment**

- **☁️ AWS ECR (Elastic Container Registry)** – Secure storage for Docker images.  
- **🚦 AWS AppRunner** – Fully managed service for deploying containerized applications.  
- **🛠️ Infrastructure as Code (IaC)** – Automated provisioning and management of AWS resources using IAM roles.  
- **🔗 CI/CD Pipeline** – Automated workflow from code push to deployment:  
  - **Push to Main (PR)** → **GitHub Actions** → **Docker Build** → **AWS ECR** → **AWS AppRunner**.

### **Development Principles**

- **🧩 Domain-Driven Design (DDD)** – Focus on core business logic and domain models.  
- **🧪 Test-Driven Development (TDD)** – Write tests before implementation to ensure reliability.  
- **🔧 SOLID Principles** – Design patterns for maintainable and scalable code.  
- **📂 Modular Codebase** – Organized and reusable components for easier maintenance.

## ⚙️ Getting Started <a id="getting-started"></a> 

### Prerequisites  

To run this project, you need:  
- 🐳 **[Docker](https://www.docker.com/)** – Runs the entire application (MongoDB and the built API image)  

### Installation  

1️⃣ Clone this repository:  
`git clone https://github.com/your-username/order-logistics-api.git`  

2️⃣ Enter the project directory:  
`cd order-logistics-api`  

3️⃣ Install dependencies:  
`npm install`  

### Running the Project  

1️⃣ Start the services with Docker:  
`docker-compose up -d`  

2️⃣ Make HTTP requests to the base URL [http://localhost:3333](http://localhost:3333)

## 🔑 Environment Variables <a id="env-vars"></a> 

```
PORT=3333
NODE_ENV="dev"

# Database
DATABASE_URL="mongodb://mongodb:docker@localhost:27017/order-logistics?authSource=admin"

# JWT Secrets => Generate ECDSA private key and then public key
JWT_PRIVATE_KEY="jwt_ec_key"
JWT_PUBLIC_KEY="jwt_ec_public_key"

# Auth with GitHub
GITHUB_CLIENT_ID="someID"
GITHUB_CLIENT_SECRET="someSecret"
```

## ✅ Functional Requirements <a id="functional-requirements"></a> 

- [x] Application must have two roles for users: admin and/or delivery person  
- [x] It should be possible to sign in with CPF (National ID) and password  
- [x] It should be possible to perform the CRUD of the delivery people  
- [ ] It should be possible to perform the CRUD of the orders  
- [ ] It should be possible to perform the CRUD of the recipients  
- [ ] It should be possible to flag an order as awaiting (Available for pickup)  
- [ ] It should be possible to pickup an order  
- [ ] It should be possible to flag an order as delivered  
- [ ] It should be possible to flag an order as returned  
- [ ] It should be possible to list orders whose delivery addresses are close to the delivery person  
- [x] It should be possible to change user's password  
- [ ] It should be possible to list user's orders  
- [ ] It should be possible to notify recipient on every order status change  

## 📜 Business Rules <a id="business-rules"></a> 

- [x] Only admin users can perform CRUD of the delivery people  
- [ ] Only admin users can perform CRUD of the orders  
- [ ] Only admin users can perform CRUD of the recipients  
- [ ] A photo is needed to flag an order as delivered  
- [ ] Only the delivery person who picked up the order can flag it as delivered  
- [x] Only admin users can change an user's password  
- [ ] It should not be possible for a delivery person to list another one's orders  

## 🧪 Running Tests <a id="running-tests"></a>  

Run unit tests with:  

```bash
npm test
```  

Run end-to-end (e2e) tests with:  

```bash
npm run test:e2e
```    

## 🔗 API Endpoints <a id="api-endpoints"></a> 

### Register delivery person - [POST] /users

### Authenticate login - [POST] /auth

### Authenticate with GitHub (OAuth 2.0) - [GET] /auth/github
Redirects users to authorization github page and then to /auth/github/callback, which can link github with already created users or login into API  

## 🤝 Contributing <a id="contributing"></a>  

Want to contribute? Follow these steps:  

1. Fork the repository.  
2. Create a new branch: `git checkout -b feature-branch`.  
3. Make your changes and commit: `git commit -m "Added new feature"`.  
4. Push to your fork: `git push origin feature-branch`.  
5. Open a Pull Request.  

## 📜 License <a id="license"></a>  
This project is under the **MIT License** – see the [LICENSE](https://opensource.org/license/MIT) file for details.  

## 📩 Contact <a id="contact"></a>  
For support or inquiries, contact:  

- **Email:** arakakimath@gmail.com  
- **LinkedIn:** [Matheus Arakaki](https://linkedin.com/in/arakakimath)  
- **GitHub:** [@arakakimath](https://github.com/arakakimath)
