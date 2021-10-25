const generatePage = require('./src/generatePage.js');

const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');

const fs = require('fs');
const inquirer = require('inquirer');

let teamMembers = [];

const managerQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the Manager's office number?",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log('Enter an office number');
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
    .then(managerData => {
        let { officeNumber } = managerData;
        let role = 'Manager';
        employeeQuestions(role, officeNumber);
    })
};

const employeeType = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "Choose the employee type:",
            choices: ['Engineer', 'Intern']
        }
    ])
    .then(employeeTypeData => {
        let { role } = employeeTypeData;

        if (role === 'Engineer') {
            engineerQuestions;
        } else if (role === 'Intern') {
            internQuestions;
        } else {
            console.log('Failed to choose an employee type (employeeType() Function)');
        }
    });
};

const engineerQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'gitHubUsername',
            message: 'What is the GitHub Username of this Engineer?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Enter Engineer's GitHub Username");
                }
            }
        }
    ])
    .then(engineerData => {
        let { gitHubUsername } = engineerData;
        let role = 'Engineer';
        employeeQuestions(role, gitHubUsername);
    })
};

const internQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'school',
            message: 'What is the school of this Intern?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Enter Intern's School");
                }
            }
        }
    ])
    .then(internData => {
        let { school } = internData;
        let role = 'Intern';
        employeeQuestions(role, school);
    })
};