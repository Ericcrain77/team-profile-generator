const Employee = require('../lib/Employee');

test("Create Employee Object", () => {
    const employee = new Employee('test', 1, 'test@email.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});

test("Obtain employee's name", () => {
    const employee = new Employee('test', 1, 'test@email.com');

    expect(employee.getName()).toEqual(expect.any(String));
})

test("Obtain employee's ID", () => {
    const employee = new Employee('test', 1, 'test@email.com');

    expect(employee.getId()).toEqual(expect.any(Number));
})

test("Obtain employee's email", () => {
    const employee = new Employee('test', 1, 'test@email.com');

    expect(employee.getEmail()).toEqual(expect.any(String));
})

test("Obtain employee's role", () => {
    const employee = new Employee('test', 1, 'test@email.com');

    expect(employee.getRole()).toEqual('Employee');
})