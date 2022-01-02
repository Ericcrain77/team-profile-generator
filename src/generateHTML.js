function createEmployeeCard(name, icon, id, email, value1, role) {
    return `
        <div class="card bg-primary mb-3" style="width: 18rem;">
            <div class="card-header">
                <h2>${name}</h2>
                <div class="row icon">
                    <img src="../assets/icons/${icon}.png" /><h3>${role}</h3>
                </div>
            </div>
            <div class="card-body">
                <div class="align-items-start">
                    <h5>ID: ${id}</h5>
                    <h5>Email: <a href="mailto:${email}">${email}</a></h5>
                    <h5>${value1}</h5>
                </div>
            </div>
        </div>
    `
};

function createHTML(employeeCards) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="./style.css">
        <title>Team Profile</title>
    </head>
    <body>
        <header class="p-3 mb-2 text-white header">
            <h1>My Team</h1>
        </header>

        <section>
            <div class="container">
                <div class="d-flex justify-content-sm-around row align-self-center">
                    ${employeeCards}
                </div>
            </div>
        </section>
    </body>
    </html>
    `
};

const generateHTML = function(data) {
    var teamMembersFull = [];

    for (var i = 0; i < data.length; i++) {
        var employee = data[i];
        var name = employee.getName();
        var id = employee.getId();
        var email = employee.getEmail();
        var role = employee.getRole();

        if (role === 'Manager') {
            var officeNumber = employee.getOfficeNumber();
            var officeNum = `Office Number: ${officeNumber}`;
            var role = `Manager`;
            var icon = `manager`;
            const managerSection = createEmployeeCard(name, icon, id, email, officeNum, role);
            teamMembersFull.push(managerSection);
        } else if (role === 'Engineer') {
            var gitHubUsername = employee.getGithub();
            var ghUsrn = `GitHub: <a href="https://github.com/${gitHubUsername}">${gitHubUsername}</a>`;
            var role = `Engineer`;
            var icon = `engineer`;
            const engineerSection = createEmployeeCard(name, icon, id, email, ghUsrn, role);
            teamMembersFull.push(engineerSection);
        } else if (role === 'Intern') {
            var school = employee.getSchool();
            var edu = `School: ${school}`;
            var role = `Intern`;
            var icon = `intern`;
            const internSection = createEmployeeCard(name, icon, id, email, edu, role);
            teamMembersFull.push(internSection);
        } else {
            console.log("Failure to retrieve teammembers.")
        }
    }

    const teamSection = teamMembersFull.join('');
    return createHTML(teamSection);
};

module.exports = generateHTML;