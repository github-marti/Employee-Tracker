const inquirer = require("inquirer");
const connection = require("./config/connection");
let employeeArray, managerArray, departmentArray, roleArray;

const getByDepartmentQ = {
        type: "list",
        message: "What department would you like to see employees from?",
        choices: departmentArray,
        name: "name"
}

const getByManagerQ = {
        type: "list",
        message: "Which manager's employees would you like to see?",
        choices: managerArray,
        name: "name"
};

const addEmployeeQ = [{
        type: "input",
        message: "What is the new employee's first name?",
        name: "firstName"
    },
    {
        type: "input",
        message: "What is the new employee's last name?",
        name: "lastName"
    },
    {
        type: "list",
        message: "What is the employee's role?",
        choices: roleArray,
        name: "chosenRole"
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        choices: employeeArray,
        name: "chosenManager"
    }]
const removeEmployeeQ = {
        type: "list",
        message: "Which employee would you like to remove?",
        choices: employeeArray,
        name: "name"
    }
const updateEmployeeByRoleQ = [{
        type: "list",
        message: "Which employee would you like to update?",
        choices: employeeArray,
        name: "id"
    },
    {
        type: "list",
        message: "What is the employee's new role?",
        choices: roleArray,
        name: "role"
    }]

const updateEmployeeByManagerQ = [{
        type: "list",
        message: "Which employee would you like to update?",
        choices: employeeArray,
        name: "id"
    },
    {
        type: "list",
        message: "Who is the employee's new manager?",
        choices: employeeArray,
        name: "manager"
    }];

const initialQ = {
        type: "list",
        message: "What would you like to do?",
        choices: [{name: "View all employees", value: null, function: getAll}, 
                {name: "View employees by department", value: getByDepartmentQ, function: getByDepartment}, 
                {name: "View employees by manager", value: getByManagerQ},
                {name: "Add employee", value: addEmployeeQ},
                {name: "Remove employee", value: removeEmployeeQ}, 
                {name: "Update employee role", value: updateEmployeeByRoleQ}, 
                {name: "Update employee manager", value: updateEmployeeByManagerQ}, 
                {name: "End program", value: null}],
        name: "choice"
}

// promisifying connection.query

function query(sql, args) {
    return new Promise((resolve, reject) => {
        connection.query(sql, args, (err, rows) => {
            if (err)
                return reject(err);
            resolve(rows);
        });
    });
}

// functions for getting information from db for inquirer questions

async function getEmployees() {
    let employees = await query(`SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee`);

    return employees;
};

async function getDepartments() {
    let departments = await query(`SELECT name, id AS value FROM department`);

    return departments;
};

async function getRoles() {
    let roles = await query(`SELECT title AS name, id AS value FROM role`);

    return roles;
}

async function getManagers() {
    let managers = await query(`
        SELECT CONCAT(e.first_name, ' ', e.last_name) AS name, e.id AS value FROM employee e
        INNER JOIN employee m ON m.manager_id = e.id
        `);

    return managers;
};

// functions for getting specific data from the database

function getAll() {
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
};

function getByDepartment(departmentId) {
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
};

function getByManager(managerId) {
    query(`
        SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Employee FROM employee e
        INNER JOIN employee m ON m.id = e.manager_id
        WHERE e.manager_id = ${managerId}
        `)
    .then(results => {
        console.table(results);
        askQuestion();
    });
};

function addEmployee({firstName, lastName, chosenRole, chosenManager}) {
    query(`
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ("${firstName}", "${lastName}", ${chosenRole}, ${chosenManager})
        `)
    .then(results => {
        console.log(`Successfully added ${firstName} ${lastName}`)
        askQuestion();
    });
};

function removeEmployee(employeeId) {
    query(`
        DELETE FROM employee e WHERE e.id = ${employeeId}
        `)
    .then(results => {
        askQuestion();
    });
};

function updateEmployeeByRole(employeeId, roleId) {
    query(`
        UPDATE employee SET role_id = ${roleId}, manager_id = null WHERE id = "${employeeId}"
        `)
    .then(results => {
        console.log("Employee has been successfully updated.");
        askQuestion();
    });
};

function updateEmployeeByManager(employeeId, managerId) {
    query(`
        UPDATE employee SET manager_id = ${managerId} WHERE id = "${employeeId}"
        `)
    .then(results => {
        console.log("Employee has been successfully updated.");
        askQuestion();
    });
};

// function that asks the questions (need to find a way to make this loop better)

async function runApp() {
    let command = await inquirer.prompt(initialQ);
      if (command) {
        nextCommand = await inquirer.prompt(command.choice)
        console.log("command: ", command);
        console.log("nextCommand: ", nextCommand);
        console.log("command.choice: ", command.choice);
        command.choice.function(nextCommand);
      }
    
    return command;
  }

  runApp();

async function askQuestion() {
    let userCommand = await inquirer.prompt(initial);
        switch (userCommand.choice) {
            case "View all employees":
                getAll();
                break;
            case "View employees by department":
                departmentArray = await getDepartments();
                let viewByDepartment = await inquirer.prompt(questions.viewByDepartment);
                getByDepartment(viewByDepartment.name);
                break;
            case "View employees by manager":
                managerArray = await getManagers();
                let viewByManager = await inquirer.prompt(questions.viewByManager);
                getByManager(viewByManager.name);
                break;
            case "Add employee":
                employeeArray = await getEmployees();
                roleArray = await getRoles();
                employeeArray.unshift({name: "none", value: null});

                let newEmployee = await inquirer.prompt(questions.addEmployee);

                const {firstName, lastName, chosenRole, chosenManager} = newEmployee;
                addEmployee({firstName, lastName, chosenRole, chosenManager});
                break;
            case "Remove employee":
                employeeArray = await getEmployees();

                let employeeToRemove = await inquirer.prompt(questions.removeEmployee);
                removeEmployee(employeeToRemove.name);
                break;
            case "Update employee role":
                employeeArray = await getEmployees();
                roleArray = await getRoles();
                let employeeRoleUpdate = await inquirer.prompt(questions.updateEmployeeByRole);
                updateEmployeeByRole(employeeRoleUpdate.id, employeeRoleUpdate.role);
                break;
            case "Update employee manager":
                employeeArray = await getEmployees();
                let employeeManagerUpdate = await inquirer.prompt(questions.updateEmployeeByManager);
                updateEmployeeByManager(employeeManagerUpdate.id, employeeManagerUpdate.manager);
                break;
            case "End program":
                console.log("Thank you for using me!");
                connection.end();
    };
};

