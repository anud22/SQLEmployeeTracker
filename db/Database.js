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
    getAllRolesNameQuery = async () => await this.executeQuery('SELECT title FROM role order by title;');
    getAllEmployesNameQuery = async () => await this.executeQuery(`SELECT CONCAT(first_name, ' ', last_name) FROM employee order by first_name;`);
    getAllRolesQuery = async () => await this.executeQuery('SELECT * FROM role;');
    getAllEmployeesQuery = async () => await this.executeQuery('SELECT * FROM employee;');
    addDepartmentQuery = async (name) => {
        try {
            let id = await this.getNextIdFromDepartmentsQuery() + 1;
            await this.executeQuery(`INSERT INTO department(id, name) VALUES (${id}, '${name}');`);
            console.log(`Department ${name} added to the database`);
        } catch (err) {
            console.error('Department not added');
        }
    }
    getEmployeesByManager = async () => await this.executeQuery(`SELECT e1.id 'Employee Id' , concat(e1.first_name,' ',  e1.last_name) 'Employee Name' , e1.manager_id 'Manager Id', concat(e2.first_name,' ', e2.last_name) 'Manager Name' from employee e1 JOIN employee e2 ON e1.manager_id = e2.id;`);
    getEmployeesByDepartment = async () => await this.executeQuery(`SELECT first_name 'First Name', last_name 'Last Name', name 'Department' from employee emp JOIN role on emp.role_id = role.id JOIN department dept on dept.id = role.department_id`);
    getSalariesSumByDepartment = async () => await this.executeQuery(`SELECT dept.id 'Department id', name 'Department Name', sum(salary) 'Budget' from role JOIN department dept on role.department_id = dept.id group by dept.id, name;`);
    addRoleQuery = async (title, salary, department) => {
        try {
            let deptId = await this.getDepartmentId(department);
            let roleId = await this.getNextRoleId() + 1;
            await this.executeQuery(`INSERT INTO role(id, title, salary, department_id) VALUES (${roleId}, '${title}', ${salary}, ${deptId});`);
            console.log(`Role ${title} added to the database`);
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

    getEmployeeIdQuery = async (firstname, lastname) => {
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
            if (!manager.toLowerCase().includes('none')) {
                const managerFirstname = manager.split(" ")[0];
                const managerLastname = manager.split(" ")[1];
                managerId = await this.getEmployeeIdQuery(managerFirstname, managerLastname);
                if (!managerId) {
                    throw new Error('Manager not found');
                }
            }
            const id = await this.getNextIdFromEmployeeQuery();
            await this.executeQuery(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES(${id}, '${firstname}', '${lastname}', ${roleId} , ${managerId});`);
            console.log(`Employee ${firstname}` + ' ' + `${lastname} added in the database`);
        } catch (err) {
            console.error(err, 'Employee not added');
        }
    }

    updateEmployeeRoleQuery = async (name, role) => {
        try {
            const roleId = await this.getRoleIdQuery(role);
            if (!roleId) {
                throw new Error('Role not found');
            }
            const firstname = name.split(" ")[0];
            const lastname = name.split(" ")[1];

            await this.executeQuery(`UPDATE employee SET role_id = ${roleId} WHERE first_name = '${firstname}' and last_name= '${lastname}';`);
            console.log(`Employee ${firstname}` + ' ' + `${lastname} role was changed to ${role} in the database`);
        } catch (err) {
            console.error(err, 'Employee role not updated');
        }
    }
    deleteEmployeeQuery = async (name) => {
        try {
            const firstname = name.split(" ")[0];
            const lastname = name.split(" ")[1];
            await this.executeQuery(`DELETE FROM employee WHERE first_name = '${firstname}' and last_name= '${lastname}';`);
            console.log(`Employee ${firstname}` + ' ' + `${lastname} deleted in the database`);
        } catch (err) {
            console.error(err, 'Employee not deleted');
        }
    }

    updateEmployeeManagerQuery = async (name, managerName) => {
        try {
            let managerId = null;
            if (!managerName.toLowerCase().includes('none')) {
                managerId = await this.getEmployeeIdQuery(managerName.split(" ")[0], managerName.split(" ")[1]);
            }
            await this.executeQuery(`UPDATE employee SET manager_id = ${managerId} WHERE first_name = '${name.split(" ")[0]}' and last_name= '${name.split(" ")[1]}';`);
            console.log(`Employee ${name}'s manager was changed to ${managerName} in the database`);
        } catch (err) {
            console.error(err, 'Employee manager not updated');
        }
    }


}


module.exports = Database;