require inquirer and mysql

inquirer functions:

initial - inquirer asks what user would like to do
- view all employees
- view all employees by department
- view all employees by manager
- add employee
- remove employee
- update employee role
- update employee manager

view employee - GET mysql query
                initial question

add employee - inquirer collects data for first name, last name, and manager  
                ADD mysql query
                initial question

remove employee - inquirer provides a choice of all employees
                REMOVE mysql query
                initial question

update employee - inquirer collects data for desired employee update   
                UPDATE mysql query
                initial question



functions:
getAll()
getByDepartment(department)
getByManager(manager)
addEmployee(first_name, last_name, role_id, manager_id)
removeEmployee(employee)
updateEmployeeRole(employee, role_id)
updateEmployeeManager(employee, manager_id)