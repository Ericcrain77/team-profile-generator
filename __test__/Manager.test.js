const Manager = require('../lib/Manager');

test("Create a Manager's office number", () => {
    const manager = new Manager('test', 4, 'test@email.com', 1);

    expect(manager.officeNumber).toEqual(expect.any(Number));
})

test("Obtains the Manager's office number", () => {
    const manager = new Manager('test', 4, 'test@email.com', 1);

    expect(manager.getOfficeNumber()).toEqual(expect.any(Number));
})

test("Obtains the Manager's role", () => {
    role = 'Manager'
    const manager = new Manager('test', 4, 'test@email.com', 1);

    expect(manager.getRole()).toEqual('Manager');
})