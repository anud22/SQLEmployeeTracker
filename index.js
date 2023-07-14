const inquirer = require('inquirer');
const questions = require('./resources/inquirerQs');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'courses_db'
  },
  console.log(`Connected to the courses_db database.`)
);
function init() {
    inquirer.prompt(questions).then((answers) => {
        const selectedOption = answers.question;
        console.log(`You selected: ${selectedOption}`);

        if (selectedOption === 'View all departments') {
            db.query(`SELECT * FROM DEPARTMENT`, (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
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
    })
}

// Function call to initialize app
init();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});