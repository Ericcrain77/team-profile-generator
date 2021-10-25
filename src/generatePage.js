function createEmployee(name, id, email, value1, value2) {
    return `
    <section>
        <div>
            <h3>${name}</h3>
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
        <title>My Team</title>
    </head>
    <body>
        <header>
            <h1>My Team</h1>
        </header>
        <main>
            <section>
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
            let officeNum = `<p>Office Number: ${officeNumber}</p>`
            const managerSection = createEmployee(name, id, email, officeNum);
            teamMembersFull.push(managerSection);
        } else if (role === 'Engineer') {
            let gitHubUsername = employee.getGitHubUsername();
            let ghUsrn = `<p>GitHub Username: <a href = "https://github.com/${gitHubUsername}">${gitHubUsername}</a></p>`;
            const engineerSection = createEmployee(name, id, email, ghUsrn);
            teamMembersFull.push(engineerSection);
        } else if (role === 'Intern') {
            let school = employee.getSchool();
            let edu = `<p>School: ${school}</p>`
            const internSection = createEmployee(name, id, email, edu);
            teamMembersFull.push(internSection);
        } else {
            console.log("Failure to retrieve teammembers.")
        }
    }

    const teamSection = teamMembersFull.join('');
    return createHTML(teamSection);
};

module.exports = generatePage;