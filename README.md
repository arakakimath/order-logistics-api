# Order Logistics API 🚛

Last challenge of Rocketseat's Node.js course, in which the student has to develop an API for a fictitious delivery company called FastFeet, to manage related issues.

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

(Brief description of what the API does)  

## 🚀 Technologies <a id="technologies"></a> 

### **Tech Stack & Tools**

- **🟢 NestJS (Express)** – Modular and structured Node.js framework for building efficient and scalable server-side applications.  
- **📌 TypeScript** – Statically typed JavaScript for enhanced code quality and maintainability.  
- **🍃 MongoDB + Mongoose** – NoSQL database with a schema-based ORM for flexible and scalable data persistence.  
- **🐳 Docker** – Containerized infrastructure for consistent development and deployment environments.  
- **📦 Clean Architecture** – Separation of concerns for a modular, testable, and scalable codebase.  
- **🔐 JWT Authentication (RS256)** – Secure user authentication using private/public key encryption.  
- **🛡️ Zod** – Schema-based validation for environment variables, request body, query, and params.  
- **🧪 Vitest + Supertest** – Unit and integration testing for ensuring API reliability and robustness.  
- **📝 ESLint** – Code formatting and linting for maintaining consistent code quality.  
- **🔑 bcryptjs** – Password hashing and comparison for secure authentication.  
- **📄 Swagger** – API documentation for easy testing and integration.  
- **🚀 Semantic Release** – Automated versioning and changelog generation for streamlined releases.

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

(List of required environment variables and how to configure them)    

## ✅ Functional Requirements <a id="functional-requirements"></a> 

- [x] Application must have two roles for users: admin and/or delivery person  
- [x] It should be possible to sign in with CPF (National ID) and password  
- [ ] It should be possible to perform the CRUD of the delivery people  
- [ ] It should be possible to perform the CRUD of the orders  
- [ ] It should be possible to perform the CRUD of the recipients  
- [ ] It should be possible to flag an order as awaiting (Available for pickup)  
- [ ] It should be possible to pickup an order  
- [ ] It should be possible to flag an order as delivered  
- [ ] It should be possible to flag an order as returned  
- [ ] It should be possible to list orders whose delivery addresses are close to the delivery person  
- [ ] It should be possible to change user's password  
- [ ] It should be possible to list user's orders  
- [ ] It should be possible to notify recipient on every order status change  

## 📜 Business Rules <a id="business-rules"></a> 

- [ ] Only admin users can perform CRUD of the orders  
- [ ] Only admin users can perform CRUD of the delivery people  
- [ ] Only admin users can perform CRUD of the recipients  
- [ ] A photo is needed to flag an order as delivered  
- [ ] Only the delivery person who picked up the order can flag it as delivered  
- [ ] Only admin users can change an user's password  
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

(List and describe API routes, including request/response examples)

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
