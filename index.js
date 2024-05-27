const inquirer = require("inquirer");

const logo = require("asciiart-logo");
require("console.table");


const { Client } = require('pg');

// Create a new client instance
const db = new Client({
    host: "localhost",
    user: "postgres",
    password: "103205mt",
    database: "employee_db",
});

// Connect to the database
db.connect()
    .then(() => console.log(`Connected to employees_db database.`))
    .catch(err => console.error('Error connecting to database:', err));


const start = () => {
    const logoText = logo({ name: "minions" }).render()
    console.log(logoText)
    inquirer.prompt([
        {
            type: "list",
            name: "openingMessage",
            message: "What would you like to do?",
            choices: [
                "viewAllEmployees",
                "viewAllDepartments",
                "viewAllRoles",
                "addADepartment",
                "addARole",
                "addAEmployee",
                "updateEmployee",
                "quit",
            ],
        },
    ]).then((openingAnswer) => {
        let choices = openingAnswer.openingMessage
        switch (choices) {
            case "viewAllEmployees":
                viewAllEmployees();
                break;
            case "viewAllDepartments":
                viewAllDepartments();
                break;
            case "viewAllRoles":
                viewAllRoles();
                break;
            case "addADepartment":
                addADepartment();
                break;
            case "addARole":
                addARole();
                break;
            case "addAEmployee":
                addAEmployee();
                break;
            case "updateEmployee":
                updateEmployee();
                break;
            case "quit":
                quit();
                break;
        }
    })
}


function viewAllDepartments(){
    db.query("SELECT * FROM department", function(err,res){
        err?console.error(err):console.table(res.rows); start()
    })
}
function viewAllRoles(){
    db.query("SELECT * FROM role", function(err,res){
        err?console.error(err):console.table(res.rows); start()
    })
}
function viewAllEmployees(){
    db.query("SELECT * FROM employee", function(err,res){
        err?console.error(err):console.table(res.rows); start()
    })
}

function addADepartment(){
    inquirer.prompt([
        {
            type:"input",
            name:"department",
            messagae:"what department would you like to add? "
        }
    ]).then((departmentAnswer)=>{
        let departmentName = departmentAnswer.department

        db.query("INSERT INTO department (dept_name) VALUES ($1)",[departmentName],function(err,res){
            err?console.error(err):viewAllDepartments();
        })
    })
}

function addARole(){
    db.query("SELECT * FROM department",function(err,res){
        if (err){
            console.error(err);
            start()
        } 

        const departmentList = res.rows.map((department)=>({
            value:department.id,
            name:department.dept_name
        }))
        inquirer.prompt([
            {
                type:"input",
                name:"newRole",
                message:"What role would you like to add? "
            },
            {
                type:"input",
                name:"salary",
                message:"How much do they make? "
            },
            {
                type:"list",
                name:"roleList",
                message:"What department are you adding the role to? ",
                choices:departmentList
            }
        ]).then((roleAnswers)=>{
            console.log(parseInt(roleAnswers.salary))
            let roleTitle = roleAnswers.newRole
            let roleSalary = parseInt(roleAnswers.salary)
            let department = roleAnswers.roleList


            db.query("INSERT INTO role (title,salary,department_id) VALUES ($1,$2,$3)",[roleTitle,roleSalary,department],function(err,res){
                console.log(res)
                err?console.error(err):viewAllRoles();
            })
        })
    })

}

function addAEmployee(){
    db.query("SELECT * FROM employee,")
}

function quit(){
    console.log("bye")
    process.exit()
}

start()