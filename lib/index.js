const inquirer = require('inquirer');
const mysql = require('mysql2');
const conTable = require('console.table');

function startTracker() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: "choices",
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees by Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'View All Roles',
                'Exit Employee Tracker'
            ]
        }
    ]).then(function (val) {
        switch (val.choice) {
            case 'View All Employees':
                viewAllEmployees();
                break;

            case 'View All Employees by Department':
                viewByDepo();
                break;

            case 'View All Employees by Manager':
                viewByManager();
                break;

            case 'Add Employee':
                addEmployee();
                break;

            case 'Remove Employee':
                removeEmployee();
                break;

            case 'Update Employee Role':
                updateRole();
                break;

            case 'Update Employee Manager':
                updateManager();
                break;

            case 'View All Roles':
                viewAllRoles();
                break;

            case 'Exit Employee Tracker':
                exitTracker();



        }
    })
};

function viewAllEmployees() {};
function viewByDepo() {};
function viewByManager() {};
function addEmployee() {};
function removeEmployee() {};
function updateRole() {};
function updateManager() {};
function viewAllRoles() {};
function exitTracker() {};

module.exports = {
    startTracker,
    viewAllEmployees,
    viewByDepo,
    viewByManager,
    addEmployee,
    removeEmployee,
    updateRole,
    updateManager,
    viewAllRoles,
    exitTracker
};