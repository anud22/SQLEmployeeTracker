const inquirer = require('inquirer');
const Database = require('./db/Database');

// Connect to database
const db = new Database();
const questions = function promptUser() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Choose an option',
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
                console.table(departments);
                promptUser();
            } else if (selectedOption === 'View all roles') {
                const roles = await db.getAllRolesQuery();
                console.table(roles);
                promptUser();
            } else if (selectedOption === 'View all employees') {
                const employees = await db.getAllEmployeesQuery();
                console.table(employees);
                promptUser();
            } else if (selectedOption === 'Add a department') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'department',
                        message: 'Enter department'
                    },
                ])
                    .then(async (answer) => {
                        await db.addDepartmentQuery(`${answer.department}`);
                        promptUser();
                    });
            } else if (selectedOption === 'Add a role') {
                // Code to handle adding a role
            } else if (selectedOption === 'Add an employee') {
                // Code to handle adding an employee
            } else if (selectedOption === 'Update an employee role') {
                // Code to handle updating an employee role
            } else if (selectedOption === 'Quit') {
                console.log('Goodbye!');
                process.exit(0);
            }

        });
};

questions();
