# Employee-tracker-wk-12

  ![](https://img.shields.io/badge/license-MIT-blue)

  ## Description
 This is a node.js application that tracks employees in a company database. The user will be given some prompts on what information they would like to access from the database and they will also be able to update employee records right from the command line.

  ## Table of Contents
  1. [Installation](##installation)
  2. [User Story](#user-story)
  3. [Acceptance Criteria](#acceptance-criteria)
  4. [Demo](#demo)
  5. [Technology](#technology)
  6. [Questions](#questions)
  7. [License](#license)
  

  ## Installation
  1. Fork this repository
  2. Clone repository to your local directory
  3. Make sure you have installed Node.js 
  4. Run npm install to install the necessary dependencies
  ```
  npm install
  ```
  5. Run mysql to load the initial employee database
  ```
  mysql -u root -p
  ```
  6. Load the schema and seed the database
  ```
  source db/schema.sql
  ```
  ```
  source db/seeds.sql
  ```
  7. type "node server.js" or "npm start" in the command line to run the app
  ```
  node server.js
  ```
  ```
  npm start
  ```

  ## User Story
  ```
  AS A business owner
  I WANT to be able to view and manage the departments, roles, and employees in my company
  SO THAT I can organize and plan my business
  ```
  ## Acceptance Criteria
  ```
  GIVEN a command-line application that accepts user input
  WHEN I start the application
  THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
  WHEN I choose to view all departments
  THEN I am presented with a formatted table showing department names and department ids
  WHEN I choose to view all roles
  THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
  WHEN I choose to view all employees
  THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  WHEN I choose to add a department
  THEN I am prompted to enter the name of the department and that department is added to the database
  WHEN I choose to add a role
  THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
  WHEN I choose to add an employee
  THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
  WHEN I choose to update an employee role
  THEN I am prompted to select an employee to update and their new role and this information is updated in the database
  ```

  ## Demo

  [Screen Castify](https://watch.screencastify.com/v/JUZlSEJf0KcBRZ490q2b)

  ## Technology Used
  **1. [Node.js](https://nodejs.org/en/)**:
  * [NPM](https://www.npmjs.com/): Node Package Manager
  * [Inquirer](https://www.npmjs.com/package/inquirer): used for making the prompts.

  **2. [MySQL2](https://www.npmjs.com/package/mysql2)**

  **3. [Console.table](https://www.npmjs.com/package/console.table)**

  ## Questions

  If you have any questions regarding this project, you can reach me at my GitHub account or by email at:
  <br />
  Github: [rmartin1985](https://github.com/rmartin1985)
  <br />
  Email: rmartin1985@att.net

  ## License
  Licensed under the [MIT License](LICENSE)
 