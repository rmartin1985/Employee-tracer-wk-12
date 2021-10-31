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
    ]).then(function (val) {
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
function addADepo() { };

// function to add a role
function addARole() { };

// function to add an employee
function addEmployee() { };

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