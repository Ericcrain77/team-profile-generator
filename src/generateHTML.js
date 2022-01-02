function createEmployeeCard(name, icon, id, email, value1, value2) {
    return `
        <div class="card bg-primary mb-3" style="width: 18rem;">
            <div class="card-header">
                <h2>${name}</h2>
                <div class="row icon">
                    <img src="../assets/icons/${icon}.png" /><h3>${value2}</h3>
                </div>
            </div>
            <div class="card-body">
                <div class="align-items-start">
                    <h5>ID: ${id}</h5>
                    <h5>Email: <a href = "mailto:${email}">${email}</a></h5>
                    <h5>${value1}</h5>
                </div>
            </div>
        </div>
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
                    ${employeeSections}
                </div>
            </div>
        </section>
    </body>
    </html>
    `
};

