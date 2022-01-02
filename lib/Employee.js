class Employee {
    constructor(data) {
        const { name, id, email, officeNumber, gitHubUsername, school } = data;

        this.name = name;
        this.id = id;
        this.email = email;
        this.officeNumber = officeNumber;
        this.gitHubUsername = gitHubUsername;
        this.school = school;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return this.role;
    }
}

module.exports = Employee;