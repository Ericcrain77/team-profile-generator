const Intern = require('../lib/Intern');

test("Creates an intern's school name", () => {
    const intern = new Intern('test', 3, 'test@email.com', 'test school');

    expect(intern.school).toEqual(expect.any(String));
})

test("Obtain intern's school name", () => {
    const intern = new Intern('test', 3, 'test@email.com', 'test school');

    expect(intern.getSchool()).toEqual(expect.any(String));
})

test("Obtain intern's role", () => {
    const intern = new Intern('test', 3, 'test@email.com', 'test school');

    expect(intern.getRole()).toEqual('Intern');
})