const inquirer = require('inquirer');
const db = require('./db/connection');
const util = require('util');
db.query = util.promisify(db.query)

async function menu (){
const answer = await inquirer.prompt([
   {
    type: "list",
    name: "choice",
    message: "What would you like you do?",
    choices: ["View all departments", "View all roles", "View all employees", "add a department", "add a role", "add an employee", "update an employee", "Quit"]

   } 
])
if (answer.choice === "View all departments") viewDepartments ();
else if (answer.choice === "View all roles") viewRoles ();
else if (answer.choice === "View all employees") viewemployees();
else if (answer.choice === "add a department") addDepartment();
else if (answer.choice === "add a role") addRole();
else if (answer.choice === "add an employee") addEmployee();
else if (answer.choice === "update an employee") updateEmployee();
else quit ();
}

async function addRole (){
    const department = await db.query ("select id as value, name as name from department")
    const roles = await db.query ("select id as value, title as name from role")
    const salary = await db.query("select id as value, salary as name from role")
    const answer = await inquirer.prompt([{

        type: "list", message: " what is the name of the role?", name: "title", choices: roles
    },{
        type: "list", message: " what is the salary for the role?", name: "salary", choices: salary
    },{
        type: "list", message: "what is the department for the role", name:"departmentid", choices: department
    
    }]) 
    await db.query ("insert into role(title, salary, department_id) values(?,?,?)",[answer.title, answer.salary, answer.departmentid])
    console.log("Role successfully added")

    menu()
}

async function addEmployee (){
    const roles = await db.query ("select id as value, title as name from role")
    const manager = await db.query("select id as value, concat(first_name,' ', last_name) as name from employee")
    const answer = await inquirer.prompt ([{
        type: "input", message: "what is the new employee first name?", name: "fname"
    },{
        type: "input", message: "what is the new employee last name?", name: "lname"
    },{
        type: "list", message: "what is the employee role", name: "roleid", choices: roles
    },{
        type: "list", message: "what is the employee manager", name: "managerid", choices: manager
    }])
    await db.query ("insert into employee(first_name, last_name, role_id, manager_id) values(?,?,?,?)",[answer.fname, answer.lname, answer.roleid, answer.managerid])
    console.log("Employee successfully added")

    menu()
}
async function viewemployees (){
    const sql = `SELECT employee.id, employee.first_name AS "first name", employee.last_name 
    AS "last name", role.title, department.name AS department, role.salary, 
    concat(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee manager
    ON manager.id = employee.manager_id` 
    const employees = await db.query(sql)
    console.table(employees)
    menu ()
}

menu()