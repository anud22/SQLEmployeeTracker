const inquirer = require('inquirer');
const Database = require('./db/Database');
const { displayResults, getRowsValues } = require('./db/Helper');

// Connect to database
const db = new Database();
const questions = function promptUser() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'question',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Quit'
                ]
            }
        ])
        .then(async (answers) => {
            const selectedOption = answers.question;
            console.log(`You selected: ${selectedOption}`);
            if (selectedOption === 'View all departments') {
                const departments = await db.getAllDepartmentsQuery();
                displayResults(departments);
                promptUser();
            } else if (selectedOption === 'View all roles') {
                const roles = await db.getAllRolesQuery();
                displayResults(roles);
                promptUser();
            } else if (selectedOption === 'View all employees') {
                const employees = await db.getAllEmployeesQuery();
                displayResults(employees);
                promptUser();
            } else if (selectedOption === 'Add a department') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'department',
                        message: 'What is the name of the department?'
                    },
                ])
                    .then(async (answer) => {
                        await db.addDepartmentQuery(`${answer.department}`);
                        promptUser();
                    });
            } else if (selectedOption === 'Add a role') {
                const results = await db.getAllDepartmentsNameQuery();
                const departmentNames = getRowsValues(results);
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the name of the role?'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?'
                    },
                    {
                        type: 'list',
                        message: 'Which department does the role belong to?',
                        name: 'department',
                        choices: departmentNames
                    },
                ])
                    .then(async (answer) => {
                        await db.addRoleQuery(`${answer.title}`, `${answer.salary}`, `${answer.department}`);
                        promptUser();
                    });
            } else if (selectedOption === 'Add an employee') {
                const results = await db.getAllRolesNameQuery();
                const roles = getRowsValues(results);
                const resultsEmp = await db.getAllEmployesNameQuery();
                const names = ['None'];
                names.push(getRowsValues(resultsEmp));
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstname',
                        message: `What is the employee's first name?`
                    },
                    {
                        type: 'input',
                        name: 'lastname',
                        message: `What is the employee's last name?`
                    },
                    {
                        type: 'list',
                        message: `What is employee's role?`,
                        name: 'role',
                        choices: roles
                    },
                    {
                        type: 'list',
                        message: `Who is employee's manager?`,
                        name: 'manager',
                        choices: names
                    }
                ]).then(async (answer) => {
                    await db.addEmployeeQuery(`${answer.firstname}`, `${answer.lastname}`, `${answer.role}`, `${answer.manager}`);
                    promptUser();
                });
            } else if (selectedOption === 'Update an employee role') {
                const resultsEmp = await db.getAllEmployesNameQuery();
                const names = getRowsValues(resultsEmp);
                const results = await db.getAllRolesNameQuery();
                const roles = getRowsValues(results);
                inquirer.prompt([
                    {
                        type: 'list',
                        message: `What employee's role do you want to update?`,
                        name: 'employee',
                        choices: names
                    },
                    {
                        type: 'list',
                        message: `What role do you want to assign the selected employee?`,
                        name: 'role',
                        choices: roles
                    }
                ]).then(async (answer) => {
                    await db.updateEmployeeRoleQuery(`${answer.employee}`, `${answer.role}`);
                    promptUser();
                });
            } else if (selectedOption === 'Quit') {
                console.log('Goodbye!');
                process.exit(0);
            }

        });
};

questions();
