const mysql = require('mysql2');
require('dotenv').config();
class Database {
    constructor() {
        this.dbConnection = mysql.createConnection(
            {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            },
            console.log(`Connected to the database.`)
        );
    }


    executeQuery(query) {
        try {
            this.dbConnection.promise().query(query).then(([rows, fields]) => {
                console.table(rows);
            });
        } catch (err) {
            console.error('Error happened while executing query', err);
        }
    }

    getAllDepartmentsQuery = () => this.executeQuery('SELECT * FROM department;');
    getAllRolesQuery = () => this.executeQuery('SELECT * FROM role;');
    getAllEmployeesQuery = () => this.executeQuery('SELECT * FROM employee;');
    /*
    const addDepartmentQuery = 'INSERT INTO department(id, name) VALUES (?, ?);';
    const addRoleQuery = 'INSERT INTO role(id, title, salary, department_id) VALUES (?, ?, ?, ?);';
    const addEmployeeQuery = 'INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?);';
    const updateEmployeeRoleQuery = 'UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name = ?;';
    */
}


module.exports = Database;