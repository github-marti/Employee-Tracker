DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100)
);

CREATE TABLE role (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(100),
salary DECIMAL,
department_id INT
);

CREATE TABLE employee (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(100),
last_name VARCHAR(100),
role_id INT,
manager_id INT
);

INSERT INTO department (name)
VALUES ("HR"), ("Accounts Payable"), ("Center for Japanese Studies"), ("Center for European and Russian Studies");

INSERT INTO role (title, salary, department_id)
VALUES ("Director", 100000, 3), ("Director", 100000, 4),
("Associate Director", 80000, 3), ("Assistant Director", 70000, 3),
("Assistant Director", 70000, 4), ("Program Manager", 50000, 3),
("Academic Coordinator", 50000, 4), ("Accounts Manager", 120000, 2),
("Accounts Specialist", 50000, 2), ("HR Director", 100000, 1),
("HR Specialist", 50000, 1), ("HR Assistant", 30000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marti", "McElreath", 6, 4), ("Noel", "Shimizu", 4, 1), ("Lisette", "Mora", 9, 8),
("Pamela", "Johnson", 11, 10), ("Tara", "Wake", 10, null);