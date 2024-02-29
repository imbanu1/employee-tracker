USE employee_tracker
INSERT INTO department (name) VALUES
  ('Accounting'),
  ('Finance'),
  ('Markerting'),
  ('Sales'),
  ('HR');

INSERT INTO role (title, salary, department_id) VALUES
  ('Accountant', 65000, 1),
  ('Auditor', 60000, 2),
  ('Marketing consultant', 60000, 3),
  ('Salesperson', 45000, 4),
  ('HR Manager', 80000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Mike', 'Johnson', 1, NULL),
  ('Sarah', 'Bean', 2, 3),
  ('Eric', 'Goth', 3, 2),
  ('Ben', 'Wilson', 4, 5),
  ('Jean', 'Michel', 5, 4);