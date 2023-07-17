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
        return new Promise((resolve, reject) => {
            this.dbConnection.promise().query(query).then(([rows, fields]) => {
                resolve(rows);

            }).catch((err) => {
                reject(err);
            });
        });
    }
    getAllDepartmentsQuery = async () => await this.executeQuery('SELECT * FROM department;');
    getAllRolesQuery = async () => await this.executeQuery('SELECT * FROM role;');
    getAllEmployeesQuery = async () => await this.executeQuery('SELECT * FROM employee;');
    addDepartmentQuery = async (name) => {
        try {
            let id = await this.getHighestIdFromDepartmentsQuery() + 1;
            await this.executeQuery(`INSERT INTO department(id, name) VALUES (${id}, '${name}');`);
            console.log('Department added ', `name = ${name}`);
        } catch (err) {
            console.error('Error occurred while executing the query:', err.sqlMessage);
        }
    }

    getHighestIdFromDepartmentsQuery = async () => {
        try {
            const rows = await this.executeQuery('SELECT max(id) AS maxId FROM department;');
            const maxId = rows[0]['maxId'];
            return maxId;
        } catch (err) {
            console.error('Error occurred while executing the query:', err);
            throw err;
        }
    };

    /*
    const addRoleQuery = 'INSERT INTO role(id, title, salary, department_id) VALUES (?, ?, ?, ?);';
    const addEmployeeQuery = 'INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?);';
    const updateEmployeeRoleQuery = 'UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name = ?;';
    */
}


module.exports = Database;