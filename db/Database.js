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
                console.log(err.sqlMessage);
                reject(err);
            });
        });
    }
    getAllDepartmentsQuery = async () => await this.executeQuery('SELECT * FROM department order by id;');
    getAllDepartmentsNameQuery = async () => await this.executeQuery('SELECT name FROM department order by name;');
    getAllRolesQuery = async () => await this.executeQuery('SELECT * FROM role;');
    getAllEmployeesQuery = async () => await this.executeQuery('SELECT * FROM employee;');
    addDepartmentQuery = async (name) => {
        try {
            let id = await this.getNextIdFromDepartmentsQuery() + 1;
            await this.executeQuery(`INSERT INTO department(id, name) VALUES (${id}, '${name}');`);
            console.log('Department added ', `name = ${name}`);
        } catch (err) {
            console.error('Department not added');
        }
    }

    addRoleQuery = async (title, salary, department) => {
        try {
            let deptId = await this.getDepartmentId(department);
            let roleId = await this.getNextRoleId() + 1;
            await this.executeQuery(`INSERT INTO role(id, title, salary, department_id) VALUES (${roleId}, '${title}', ${salary}, ${deptId});`);
            console.error('Role added ', title);
        } catch (err) {
            console.error('Role not added');
        }
    }

    getDepartmentId = async (department) => {
        try {
            const rows = await this.executeQuery(`SELECT id FROM department WHERE name = '${department}';`);
            const id = rows[0]['id'];
            return id;
        } catch (err) {
            console.error('Error occurred while executing the query:', 'Check if department name is correct');
            return null;
        }
    }

    getNextRoleId = async () => {
        try {
            const rows = await this.executeQuery('SELECT max(id) AS maxId FROM role;');
            const maxId = rows[0]['maxId'];
            return maxId;
        } catch (err) {
            console.error('Error occurred while fetching the next id from role');
            return null;
        }
    }

    getNextIdFromDepartmentsQuery = async () => {
        try {
            const rows = await this.executeQuery('SELECT max(id) AS maxId FROM department;');
            const maxId = rows[0]['maxId'];
            return maxId;
        } catch (err) {
            console.error('Error occurred while fetching the id from department');
            return null;
        }
    };

    getNextIdFromEmployeeQuery = async () => {
        try {
            const rows = await this.executeQuery('SELECT max(id) AS maxId FROM employee;');
            const maxId = rows[0]['maxId'] + 1;
            return maxId;
        } catch (err) {
            console.error('Error occurred while fetching the id from employee');
            return null;
        }
    };

    getRoleIdQuery = async (role) => {
        try {
            const rows = await this.executeQuery(`SELECT id FROM role where title = '${role}';`);
            const id = rows[0]['id'];
            return id;
        } catch (err) {
            console.error('Error occurred - Role not present');
            return null;
        }
    };

    getManagerIdQuery = async (firstname, lastname) => {
        try {
            const rows = await this.executeQuery(`SELECT id FROM employee where first_name = '${firstname}' and last_name = '${lastname}';`);
            const id = rows[0]['id'];
            return id;
        } catch (err) {
            console.error('Error occurred while fetching the employee with name ', firstname + " " + lastname);
            return null;
        }
    };

    addEmployeeQuery = async (firstname, lastname, role, manager) => {
        try {
            const roleId = await this.getRoleIdQuery(role);
            if (!roleId) {
                throw new Error('Role not found');
            }
            let managerId = null;
            if (manager) {
                const managerFirstname = manager.split(" ")[0];
                const managerLastname = manager.split(" ")[1];
                managerId = await this.getManagerIdQuery(managerFirstname, managerLastname);
                if (!managerId) {
                    throw new Error('Manager not found');
                }
            }
            const id = await this.getNextIdFromEmployeeQuery();
            await this.executeQuery(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES(${id}, '${firstname}', '${lastname}', ${roleId} , ${managerId});`);
            console.error('Employee added ', firstname, lastname);
        } catch (err) {
            console.error(err, 'Employee not added');
        }
    }

}


module.exports = Database;