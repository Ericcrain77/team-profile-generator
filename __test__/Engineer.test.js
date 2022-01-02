const Engineer = require('../lib/Engineer');

test("Create an engineer GitHub username", () => {
    const engineer = new Engineer('test', 2, 'test@email.com', 'testUsrName');

    expect(engineer.gitHubUsername).toEqual(expect.any(String));
})

test("Obtain engineer's GitHub username", () => {
    const engineer = new Engineer('test', 2, 'test@email.com', 'testUsrName');

    expect(engineer.getGithub()).toEqual(expect.any(String));
})

test("Obtains an engineer's role", () => {
    const engineer = new Engineer('test', 2, 'test@email.com', 'testUsrName');

    expect(engineer.getRole()).toEqual('Engineer');
})