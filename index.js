const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    },
    console.log(`Connected to the database.`)
); 
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    questions();
});
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
                    'Update an employee role'
                ]
            }
        ])
        .then((answers) => {
            const selectedOption = answers.question;
            console.log(`You selected: ${selectedOption}`);
            if (selectedOption === 'View all departments') {
                db.query(`SELECT * FROM DEPARTMENT`, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log( console.table(result));
                });
                //run query
            } else if (selectedOption === 'View all roles') {
            } else if (selectedOption === 'View all employees') {
            } else if (selectedOption === 'Add a department') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'department',
                        message: 'Enter department'
                    },
                ])
                    .then((answers) => {

                    });
            } else if (selectedOption === 'Add a role') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'role',
                        message: 'Enter role'
                    },
                ])
                    .then((answers) => {
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'title',
                                message: 'Enter title'
                            },
                            {
                                type: 'input',
                                name: 'salary',
                                message: 'Enter salary'
                            },
                            {
                                type: 'input',
                                name: 'department',
                                message: 'Enter department'
                            }])
                    });

            } else if (selectedOption === 'Add a employee') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'Enter first name'
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'Enter last name'
                    },
                    {
                        type: 'input',
                        name: 'role',
                        message: 'Enter role'
                    },
                    {
                        type: 'input',
                        name: 'manager',
                        message: 'Enter manager'
                    }
                ])
                    .then((answers) => {

                    });

            } else if (selectedOption === 'Update a employee role') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'Enter first name'
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'Enter last name'
                    },
                    {
                        type: 'input',
                        name: 'role',
                        message: 'Enter role'
                    }
                ])
                    .then((answers) => {

                    });
            }
        });
}
;

