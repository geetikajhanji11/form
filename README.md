# Todo App



<!-- PROJECT LOGO -->

<h3 align="center">Aaditya Gaur Assignment</h3>

  <p align="center">
A To-Do List application created using Java with Spring Boot for the backend and React for the frontend.

![project-image](/assets/logo.png)


<!-- ABOUT THE PROJECT -->
## About The Project
Welcome to the Todo App, a robust and user-friendly task management system designed to help you organize and prioritize your daily activities. This application is built using a modern tech stack, combining Spring Boot for the backend, React for the frontend, and PostgreSQL for the database. It incorporates Material UI for a sleek and intuitive design and utilizes JWT for secure user authentication.

### Features:
* Secure user authentication
* Add, update and delete todos
* View all todos
* Sort todos by due date
* Filter todos by completed, not completed, due today, and overdue
* Color coding of todos to indicate priority

## Tech Stack

### Backend

| Framework / Library                                  | Usage                                           |
| ----------------------------------------------------- |-------------------------------------------------|
| [Java 11](https://openjdk.java.net/projects/jdk/11/)   | Programming language.                           |
| [Spring Boot](https://spring.io/projects/spring-boot) | Java-based framework for building RESTful APIs. |
| [PostgreSQL](https://www.postgresql.org/)             | Open-source relational database.                |
| [Maven](https://maven.apache.org/)                    | Project management and build automation tool. |

### Frontend

| Framework / Library                                  | Usage                                            |
| ----------------------------------------------------- |--------------------------------------------------|
| [React](https://reactjs.org/)                         | JavaScript library for building user interfaces. |
| [Material UI](https://material-ui.com/)               | React UI framework for styling.                  |

### Authentication

| Framework / Library                                  | Usage                                                                  |
| ----------------------------------------------------- |------------------------------------------------------------------------|
| [JWT](https://jwt.io/)                                | For authenticating users. |






<!-- GETTING STARTED -->
## Getting Started

Here are the instructions on setting up the project locally.
<br>
To get a local copy up and running, follow these steps:

### Prerequisites

First, you need to download and install Java 11, Maven, Postgresql and node.
* Download Java 11.
  ```sh
  https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html
  ```
* Download Maven.
  ```sh
  https://maven.apache.org/download.cgi
  ```
* Download PostgreSQL.
  ```sh
  https://www.postgresql.org/download/
  ```

* Download node.js and npm.
  ```sh
  https://nodejs.org/en/download/
  ```

### Running the Project

1. Clone the repository.
   ```sh
   git clone https://github.com/conan1005/Leap-ToDo-App.git
   ```
#### Backend

1. Make sure you have PostgreSQL installed and running. Create a new database for your springboot application using the PostgreSQL interactive terminal.
   ```sh
    sudo -u postgres psql
    
    CREATE DATABASE your_database_name;
    CREATE USER your_username WITH PASSWORD 'your_password';
    GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_username;
    
    \q
   ```
   or you can use a GUI tool like pgAdmin to do the same.
   Note down the database name, username, and password, as we will need these credentials configuration to connect from Spring Boot.


2. Insert your PostgreSQL username, password and database name in `application.properties`. Mostly, the default username is "postgres".
     ```sh
    spring.datasource.url=jdbc:postgresql://localhost:5432/<your_database_name>
    spring.datasource.username=<your_username>
    spring.datasource.password=<your_postgresql_password>
    ```

3. Navigate to backend
   ```sh
   cd /backend/to-do-list
   ```

4. Build backend code
   ```sh
   mvn clean package
   ```
5. Start the Spring Boot server
   ```sh
    mvn spring-boot:run
   ```

#### Frontend

1. Go to the frontend directory
   ```sh
    cd /frontend
   ```

1. Install all the modules
   ```sh
    npm install
   ```

2. Run the app locally
   ```sh
    npm start
   ```
3. Open the following URL in your browser
   ```sh
    http://localhost:3000/
   ```

<!-- USAGE EXAMPLES -->
## Great! You're all done.
![project-image](/assets/todo_home.png)
<!-- CONTACT -->
## Contact

Email: [aaditya.gaur1005@gmail.com](aaditya.gaur1005@gmail.com)

Project Link: [https://github.com/conan1005/Leap-ToDo-App](https://github.com/conan1005/Leap-ToDo-App)


