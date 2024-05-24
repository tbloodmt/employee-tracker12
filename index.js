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

function quit(){
    console.log("bye")
    process.exit()
}

start()