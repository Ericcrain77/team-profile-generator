function createEmployee(name, id, email, value1, value2) {
    return `
        <section class = "member-box">
            <div>
                <h2>${name}</h2>
                ${value2}
            </div>
            <div>
                <div>
                    <p>ID: ${id}</p>
                </div>
                <div>
                    <p>Email: <a href = "mailto:${email}">${email}</a></p>
                </div>
                <div>
                    ${value1}
                </div>
            </div>
        </section>
    `
};

function createHTML(employeeSections) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./style.css">
        <title>My Team</title>
    </head>
    <body>
        <header class = "header">
            <h1>My Team</h1>
        </header>
        <main>
            <section class = "members">
                ${employeeSections}
            </section>
        </main>
    </body>
    </html>
    `
};

const generatePage = function(data) {
    let teamMembersFull = [];

    for (let i = 0; i < data.length; i++) {
        let employee = data[i];
        let name = employee.getName();
        let id = employee.getId();
        let email = employee.getEmail();
        let role = employee.getRole();

        if (role === 'Manager') {
            let officeNumber = employee.getOfficeNumber();
            let officeNum = `<p>Office Number: ${officeNumber}</p>`;
            let role = `<h3>Manager</h3>`;
            const managerSection = createEmployee(name, id, email, officeNum, role);
            teamMembersFull.push(managerSection);
        } else if (role === 'Engineer') {
            let gitHubUsername = employee.getGitHubUsername();
            let ghUsrn = `<p>GitHub Username: <a href = "https://github.com/${gitHubUsername}">${gitHubUsername}</a></p>`;
            let role = `<h3>Engineer</h3>`;
            const engineerSection = createEmployee(name, id, email, ghUsrn, role);
            teamMembersFull.push(engineerSection);
        } else if (role === 'Intern') {
            let school = employee.getSchool();
            let edu = `<p>School: ${school}</p>`;
            let role = `<h3>Intern</h3>`;
            const internSection = createEmployee(name, id, email, edu, role);
            teamMembersFull.push(internSection);
        } else {
            console.log("Failure to retrieve teammembers.")
        }
    }

    const teamSection = teamMembersFull.join('');
    return createHTML(teamSection);
};

module.exports = generatePage;