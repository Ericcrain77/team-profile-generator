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
            engineerQuestions();
        } else if (role === 'Intern') {
            internQuestions();
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

const employeeQuestions = (value1, value2) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            messgae: "What is the employee's full name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Enter Employee's Full Name.");
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the employee's ID number?",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log("Enter employee's ID number.");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the employee's email address?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Enter employee's email address.");
                }
            }
        }
    ])
    .then(employeeData => {
        if (value1 === 'Manager') {
            let officeNumber = value2;
            let { name, id, email } = employeeData;
            const manager = new Manager (name, id, email, officeNumber);
            teamMembers.push(manager);
        } else if (value1 === 'Engineer') {
            let gitHubUsername = value2;
            let { name, id, email } = employeeData;
            const engineer = new Engineer (name, id, email, gitHubUsername);
            teamMembers.push(engineer);
        } else if (value1 === 'Intern') {
            let school = value2;
            let { name, id, email } = employeeData;
            const intern = new Intern (name, id, email, school);
            teamMembers.push(intern);
        } else {
            console.log('Failed to enter employee data correctly (employeeQuestions constructor function)')
        }
        addEmployee();
    })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'addEmployee',
            message: 'Add another employee to the team?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
    .then(employeeAdd => {
        let { addEmployee } = employeeAdd;
        if (addEmployee === true) {
            employeeType();
        } else {
            console.log('Your team is complete');
            return writeToFile(teamMembers);
        }
    })
};

function writeToFile(teamMembers) {
    const team = generatePage(teamMembers);
    fs.writeFile('./dist/index.html', team, err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Team page created!')
    })
};

function initalize() {
    managerQuestions();
};

initalize();