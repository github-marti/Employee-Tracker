INSERT INTO department (name)
VALUES ("HR"), ("Accounts Payable"), ("Center for Japanese Studies");

INSERT INTO role (title, salary, department_id)
VALUES ("Director", 100000, 3),
("Associate Director", 80000, 3), ("Assistant Director", 70000, 3), 
("Program Manager", 50000, 3), ("Accounts Manager", 120000, 2),
("Accounts Specialist", 50000, 2), ("HR Director", 100000, 1),
("HR Specialist", 50000, 1), ("HR Assistant", 30000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hitoshi", "Abe", 1, null), ("Noel", "Shimizu", 4, 1), ("Marti", "McElreath", 6, 2), ("Steven", "Acosta", 8, null), ("Lisette", "Mora", 9, 4), 
("Tara", "Wake", 10, null), ("Pamela", "Johnson", 11, 6);