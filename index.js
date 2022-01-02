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
const employeeQuestions = (value1, value2, value3) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: "What is the employee's ID number?",
            validate: idInput => {
                if (isNaN(idInput)) {
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
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log("Enter employee's email address.");
                }
            }
        }
    ])
    .then(employeeData => {
        if (value1 === 'Manager') {
            var officeNumber = value3;
            var name = value2;
            var { id, email } = employeeData;
            const manager = new Manager (name, id, email, officeNumber);
            teamArray.push(manager);
        } else if (value1 === 'Engineer') {
            var gitHubUsername = value3;
            var name = value2;
            var { id, email } = employeeData;
            const engineer = new Engineer (name, id, email, gitHubUsername);
            teamArray.push(engineer);
        } else if (value1 === 'Intern') {
            var school = value3;
            var name = value2;
            var { id, email } = employeeData;
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
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter your name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is your office number?",
            validate: numberInput => {
                if (isNaN(numberInput)) {
                    console.log('Enter an office number');
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
    .then(employeeData => {
        var { name, officeNumber } = employeeData;
        var role = 'Manager';
        employeeQuestions(role, name, officeNumber);
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
            name: 'name',
            message: 'What is the name of the engineer?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter the name of the engineer.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'gitHubUsername',
            message: 'What is the GitHub Username of this Engineer?',
            validate: gitHubUsernameInput => {
                if (gitHubUsernameInput) {
                    return true;
                } else {
                    console.log("Enter Engineer's GitHub Username");
                }
            }
        }
    ])
    .then(employeeData => {
        var { name, gitHubUsername } = employeeData;
        var role = 'Engineer';
        employeeQuestions(role, name, gitHubUsername);
    })
};

// asking the questions for interns
const internQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the intern?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter the name of the intern.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the school of this Intern?',
            validate: schoolInput => {
                if (schoolInput) {
                    return true;
                } else {
                    console.log("Enter Intern's School");
                }
            }
        }
    ])
    .then(employeeData => {
        var { name, school } = employeeData;
        var role = 'Intern';
        employeeQuestions(role, name, school);
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
    const team = generateHTML(teamArray);
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