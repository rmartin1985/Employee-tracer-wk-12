const inquirer = require('inquirer');
const mysql = require('mysql2');
const conTable = require('console.table');
const connection = require('../config/connection');

function startTracker() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: "choices",
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update Employee Role',
                'Exit Employee Tracker'
            ],
            loop: false
        }
    ]).then((val) => {
        switch (val.choices) {
            case 'View All Departments':
                viewAllDepartments();
                break;

            case 'View All Roles':
                viewAllRoles();
                break;

            case 'View All Employees':
                viewAllEmployees();
                break;

            case 'Add a Department':
                addADepo();
                break;

            case 'Add a Role':
                addARole();
                break;

            case 'Add an Employee':
                addEmployee();
                break;

            case 'Update Employee Role':
                updateRole();
                break;

            case 'Exit Employee Tracker':
                exitTracker();
        }
    })
};

// function to display all employees
function viewAllEmployees() {
    let sql = `SELECT employee.id,
    employee.first_name,
    employee.last_name,
    employee_role.title,
    department.department_name AS 'department',
    employee_role.salary,
    CONCAT(e.first_name, ' ',e.last_name) AS Manager
    FROM employee
    INNER JOIN employee_role ON employee.role_id = employee_role.id
    INNER JOIN department ON employee_role.department_id = department.id
    LEFT JOIN employee e ON employee.manager_id = e.id
    ORDER BY employee.id ASC`;

    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        startTracker();
    });
};

// function to display all departments
function viewAllDepartments() {
    let sql = `SELECT * FROM Department`;

    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        startTracker();
    });
};

// function to display all roles
function viewAllRoles() {
    let sql = `SELECT employee_role.id,
    employee_role.title,
    department.department_name AS department
    FROM employee_role
    JOIN department ON employee_role.department_id = department.id`;

    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        startTracker();
    });
};

// function to add a department
function addADepo() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepo',
            message: 'What is the name of the new Department?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name for the department!');
                    return false;
                }
            }
        }
    ])
        .then((val) => {
            let sql = `INSERT INTO department (department_name) VALUES (?)`;

            connection.query(sql, val.newDepo, (err, res) => {
                if (err) throw err;
                console.log(`Successfully added ${val.newDepo} to Departments.`)
                startTracker();
            })
        })
};

// function to add a role
function addARole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the title of the new Role?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name for the role!');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'newSalary',
            message: 'What is the salary for this role?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a salary for this role!');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'depo',
            message: 'What department id number does this role belong under?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a department id number for this role!');
                    return false;
                }
            }
        }
    ])
        .then(function (answer) {
            let sql = `INSERT INTO employee_role (title, salary, department_id) VALUES (?,?,?)`;
            let answers = [answer.newRole, answer.newSalary, answer.depo]

            connection.query(sql, answers, (err, res) => {
                if (err) throw err;
                console.log(`Successfully added ${answer.newRole} to Employee Roles.`)
                startTracker();
            })
        })
};

// function to add an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstname",
            message: "What is the employee's first name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a first name for the employee!');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "lastname",
            message: "What is the emmployee's last name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a last name for the employee!');
                    return false;
                }
            }
        }
    ]).then(function (answer) {
        let sqlRoles = `SELECT employee_role.id, employee_role.title FROM employee_role`;
        let answers = [answer.firstname, answer.lastname];
        connection.query(sqlRoles, answers, (err, data) => {
            if (err) throw err;
            let roles = data.map(({ id, title }) => ({ name: title, value: id }));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roles,
                    loop: false
                }
            ])
                .then(roleChoice => {
                    let role = roleChoice.role;
                    answers.push(role);
                    let managerSql = `SELECT first_name, last_name FROM Employee WHERE manager_id is NULL`;
                    connection.query(managerSql, (err, data) => {
                        if (err) throw err;
                        let managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'manager',
                                message: "Who is the employee's manager?",
                                choices: managers,
                                loop: false
                            }
                        ])
                            .then(managerChoice => {
                                let manager = managerChoice.manager;
                                answers.push(manager);
                                let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                                connection.query(sql, answers, (err, res) => {
                                    if (err) throw err;
                                    console.log("Employee has been added!");
                                    startTracker();
                                });
                            });
                    });

                });
        });
    });
};

// function to update a role
function updateRole() { };

// function to exit the tracker
function exitTracker() { };

module.exports = {
    startTracker,
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addADepo,
    addARole,
    addEmployee,
    updateRole,
    exitTracker
};