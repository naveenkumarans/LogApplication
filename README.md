# Log Application

Welcome to the Log Application repository! This comprehensive log management system is built with Spring Boot for the backend, React for the frontend, and MySQL for database management. The system enables users to seamlessly view, filter, add, and delete logs, providing a centralized platform for effectively managing and tracking system events.

## System Architecture

The log management system employs a layered architecture, separating the backend and frontend components for enhanced maintainability and extensibility. The backend, powered by Spring Boot, handles data storage, retrieval, and logic, while the frontend, built with React, provides a user-friendly interface for interacting with the log data.

---

## Frontend (React)

### Overview

The frontend application utilizes React, a JavaScript library for building user interfaces, to deliver an interactive and intuitive experience for managing logs. It provides a comprehensive interface for viewing, filtering, adding, and deleting logs, ensuring effortless data management and organization.

### Technologies Used

- **React:** JavaScript library for building user interfaces.
- **React Router:** Library for managing client-side routing.
- **Axios:** HTTP client library for making API calls.

### Getting Started

#### Prerequisites

- Node.js installed.
- npm package manager.

#### Installation

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/naveenkumarans/log-app-frontend.git](https://github.com/dyte-submissions/november-2023-hiring-naveenkumarans/tree/master/FrontEnd)
    cd log-app-frontend
    npm install
    ```

2. **Run Locally:**

    ```bash
    npm start
    ```

---

## Backend (Spring Boot)

### Overview

The backend application, built with Spring Boot, serves as the core of the log management system. It handles data storage, retrieval, and logic, ensuring the integrity and reliability of the log data. It provides a RESTful API for interacting with the log data, enabling seamless integration with the frontend application.

### Technologies Used

- **Spring Boot:** Framework for building Java-based enterprise applications.
- **Spring Data JPA:** Simplifies data access using JPA and Spring.
- **MySQL:** Database for storing log data.

### Getting Started

#### Prerequisites

- Java JDK installed.
- Maven build tool.
- MySQL database.

#### Installation

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/naveenkumarans/log-app-backend.git](https://github.com/dyte-submissions/november-2023-hiring-naveenkumarans/tree/master/Backend)
    cd log-app-backend
    mvn clean install
    ```

2. **Configuration:**

    - Configure database details in `src/main/resources/application.properties` or use environment variables.
    - Create the necessary database tables using the provided SQL scripts.

3. **Run Locally:**

    ```bash
    java -jar target/log-app-backend.jar
    ```

---

## Contributing

If you'd like to contribute to the project, please follow the [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
