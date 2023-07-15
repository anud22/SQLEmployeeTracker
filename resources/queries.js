const getAllDepartmentsQuery = 'SELECT * FROM department;';
const getAllRolesQuery = 'SELECT * FROM role;';
const getAllEmployeesQuery = 'SELECT * FROM employee;';
const addDepartmentQuery = 'INSERT INTO department(id, name) VALUES (?, ?);';
const addRoleQuery = 'INSERT INTO role(id, title, salary, department_id) VALUES (?, ?, ?, ?);';
const addEmployeeQuery = 'INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?);';
const updateEmployeeRoleQuery = 'UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name = ?;';