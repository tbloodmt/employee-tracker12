DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
\c employee_db;


CREATE TABLE department(
    id SERIAL PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);


CREATE TABLE role(
    id SERIAL PRIMARY KEY, 
    title VARCHAR(30) UNIQUE NOT NULL,
    salary NUMERIC NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE 
);


CREATE TABLE employee(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    CONSTRAINT fk_roll FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INTEGER,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);