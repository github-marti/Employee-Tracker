const orm = {
    getAll() {
        query(`
        SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS 'Title', r.salary AS 'Salary', d.name AS 'Department Name', CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
        `)
            .then(results => {
                console.table(results);
                askQuestion();
            });
    },
    getByDepartment(departmentId) {
        query(`
        SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS 'Title' FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        WHERE d.id = ${departmentId}
        `)
            .then(results => {
                console.table(results);
                askQuestion();
            });
    },
    getByManager(managerId) {
        query(`
        SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Employee FROM employee e
        INNER JOIN employee m ON m.id = e.manager_id
        WHERE e.manager_id = ${managerId}
        `)
            .then(results => {
                console.table(results);
                askQuestion();
            });
    },
    addEmployee({ firstName, lastName, chosenRole, chosenManager }) {
        query(`
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ("${firstName}", "${lastName}", ${chosenRole}, ${chosenManager})
        `)
            .then(results => {
                console.log(`Successfully added ${firstName} ${lastName}`)
                askQuestion();
            });
    },
    removeEmployee(employeeId) {
        query(`
        DELETE FROM employee e WHERE e.id = ${employeeId}
        `)
            .then(results => {
                askQuestion();
            });
    },
    updateEmployeeByRole(employeeId, roleId) {
        query(`
        UPDATE employee SET role_id = ${roleId}, manager_id = null WHERE id = "${employeeId}"
        `)
            .then(results => {
                console.log("Employee has been successfully updated.");
                askQuestion();
            });
    },
    updateEmployeeByManager(employeeId, managerId) {
        query(`
        UPDATE employee SET manager_id = ${managerId} WHERE id = "${employeeId}"
        `)
            .then(results => {
                console.log("Employee has been successfully updated.");
                askQuestion();
            });
    }
};

module.exports = orm;
