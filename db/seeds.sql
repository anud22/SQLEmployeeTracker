INSERT INTO department(id, name)
values(1, 'Software Development'),
    (2, 'Accounts'),
    (3, 'Business'),
    (4, 'Finance'),
    (5, 'Marketing'),
    (6, 'Customer Support'),
    (7, 'HR'),
    (8, 'Security'),
    (9, 'Infrastructure'),
    (10, 'Legal');
INSERT INTO role(id, title, salary, department_id)
values(2001, 'QA', 125000, 1),
    (2002, 'Lawyer', 110000, 10),
    (2003, 'Developer', 150000, 1),
    (2004, 'Accountant', 100000, 2),
    (2005, 'HR Director', 160000, 7),
    (2006, 'BA', 11000.50, 3),
    (2007, 'Sr BA', 120000, 3),
    (2008, 'Product Owner', 100000, 3),
    (2009, 'Security Assistant', 70000, 8),
    (2010, 'Security Guard', 40000, 8),
    (2011, 'ParaLegal', 70000, 10),
    (2012, 'Customer Engr.', 70100.5, 6),
    (2022, 'Customer Support 2', 75000, 6),
    (2013, 'Dev Manager', 175000, 1),
    (2014, 'Sr IT Director', 200000, 1),
    (2015, 'VP IT Director', 250000, 1),
    (2016, 'Marketing manager', 80000, 5),
    (2017, 'Marketing supervisor', 60000, 5),
    (2018, 'Marketing Director', 20000, 5),
    (2019, 'Accounts Manager', 120000, 2),
    (2020, 'Accounts Director', 150000, 2),
    (2021, 'HR Manager', 175000, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1014, 'Kunal', 'Mehta', 2002, NULL),
    (1015, 'Phani', 'kumar', 2010, NULL),
    (1006, 'Ryan', 'Silan', 2015, NULL),
    (1007, 'Ryan', 'Toupal', 2020, NULL),
    (1010, 'Amy', 'Fadhl', 2012, NULL),
    -- Updated role_id to a valid existing role_id
    (1004, 'Nick', 'Blard', 2014, 1006),
    (1005, 'Nick', 'Blard', 2019, 1007),
    (1002, 'Moni', 'Matthew', 2013, 1004),
    (1003, 'Amy', 'C.', 2004, 1005),
    (1001, 'Anu', 'Chadha', 2001, 1002),
    (1008, 'Vincent', 'F.', 2003, 1002),
    (1009, 'Tera', 'Meyer', 2011, 1010),
    (1011, 'Melvin', 'Lezano', 2001, 1002),
    (1012, 'Angelo', 'Nick', 2001, 1002),
    (1013, 'Vani', 'Vyasa', 2011, 1014);