// fs and inquirer
const fs = require('fs');
const inquirer = require('inquirer');

// pulling generateHTML js file
const generateHTML = require('./src/generateHTML');

// pulling profiles
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

// setting team array
const teamArray = [];

// asking Employee Questions
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
            var officeNumber = value2;
            var { name, id, email } = employeeData;
            const manager = new Manager (name, id, email, officeNumber);
            teamArray.push(manager);
        } else if (value1 === 'Engineer') {
            var gitHubUsername = value2;
            var { name, id, email } = employeeData;
            const engineer = new Engineer (name, id, email, gitHubUsername);
            teamArray.push(engineer);
        } else if (value1 === 'Intern') {
            var school = value2;
            var { name, id, email } = employeeData;
            const intern = new Intern (name, id, email, school);
            teamArray.push(intern);
        } else {
            console.log('Failed to enter employee data correctly (employeeQuestions constructor function)')
        }
        addEmployee();
    })
};

// asking the questions for managers
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
        var { officeNumber } = managerData;
        var role = 'Manager';
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
        var { role } = employeeTypeData;

        if (role === 'Engineer') {
            engineerQuestions();
        } else if (role === 'Intern') {
            internQuestions();
        } else {
            console.log('Failed to choose an employee type (employeeType() Function)');
        }
    });
};

// asking the questions for engineers
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
        var { gitHubUsername } = engineerData;
        var role = 'Engineer';
        employeeQuestions(role, gitHubUsername);
    })
};

// asking the questions for interns
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
        var { school } = internData;
        var role = 'Intern';
        employeeQuestions(role, school);
    })
};

// adding employee to the team profile
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
        var { addEmployee } = employeeAdd;
        if (addEmployee === true) {
            employeeType();
        } else {
            console.log(`
                =====================
                Your team is complete
                =====================
            `);
            return writeToFile(teamArray);
        }
    })
};

function writeToFile(teamArray) {
    const team = generatePage(teamArray);
    fs.writeFile('./dist/index.html', team, err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`
            =====================
            Team Profile created!
            =====================
        `)
    })
};

function init() {
    managerQuestions();
};

init();