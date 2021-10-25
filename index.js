const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/manager");
const inquirer = require("inquirer");
const fs = require("fs");
let allOfMyTeam = [];


function managerPrompt(){
    inquirer
    .prompt([
        { 
        type: 'input',
        name: 'managerName',
        message: 'What is the manager name?',
        },
    { type: 'input',
    name: 'managerId',
    message: 'What is the manager ID?',

    },
    { type: 'input',
    name: 'managerEmail',
    message: 'What is the email for your manager?',

    },
    { type: 'input',
    name: 'officeNumber',
    message: 'What is the office number for your manager',

    }


    ]).then((res)=>{
        const newManager = new Manager (res.managerName, res.managerId, res.managerEmail, res.officeNumber)
        allOfMyTeam.push(newManager)
        menuQs()


    })}

    function engineerPrompt(){
        inquirer
        .prompt([
            { 
            type: 'input',
            name: 'engineerName',
            message: 'What is the engineer name?',
            },
        { type: 'input',
        name: 'engineerId',
        message: 'What is the engineer ID?',
    
        },
        { type: 'input',
        name: 'engineerEmail',
        message: 'What is the email for your engineer?',
    
        },
        { type: 'input',
        name: 'engineerGithub',
        message: 'What is the Github username for your engineer?',
    
        }
    
    
        ]).then((res)=>{
            const newEngineer = new Engineer (res.engineerName, res.engineerId, res.engineerEmail, res.engineerGithub)
            allOfMyTeam.push(newEngineer)
            menuQs()
    
    
        })}

        function internPrompt(){
            inquirer
            .prompt([
                { 
                type: 'input',
                name: 'internName',
                message: 'What is the intern name?',
                },
            { type: 'input',
            name: 'internId',
            message: 'What is the intern ID?',
        
            },
            { type: 'input',
            name: 'internEmail',
            message: 'What is the email for your intern?',
        
            },
            { type: 'input',
            name: 'internSchool',
            message: 'What school does your intern attend?',
        
            }
        
        
            ]).then((res)=>{
                const newIntern = new Intern (res.internName, res.internId, res.internEmail, res.internSchool)
                allOfMyTeam.push(newIntern)
                menuQs()
        
        
            })}
    
    
    function menuQs() {
        inquirer
        .prompt([{ type: 'list',
        name: 'options',
        message: 'What would you like to do now?',
        choices: ["Add Manager","Add Intern","Add Engineer","Finish Team"]
    
        }]).then((res)=>{
            if(res.options === "Add Manager"){
                managerPrompt()
                } else if (res.options === "Add Intern"){
                    internPrompt()
                }else if(res.options === "Add Engineer"){
                    engineerPrompt()
                }else if(res.options === "Finish Team"){
                    finalizeteam()
                }
                    
        })


    }
    let teamArray = [];
    let name, id, email, additionalLabel, additionalMethod;

    function finalizeteam(){
        for(let teamMember of allOfMyTeam){
            let role = teamMember.getRole();
    
            if(role === "Manager"){
            name = teamMember.getName();
            id = teamMember.getId();
            email = teamMember.getEmail();
                additionalMethod = teamMember.getOfficeNumber();
                additionalLabel = "Office number";
                icon = "Coffee";
            } else if (role === "Intern"){
                name = teamMember.getName();
            id = teamMember.getId();
            email = teamMember.getEmail();
                additionalMethod = teamMember.getSchool();
                additionalLabel = "School ";
                icon = "Graduation";
            } else if (role === "Engineer"){
                name = teamMember.getName();
            id = teamMember.getId();
            email = teamMember.getEmail();
                additionalMethod = teamMember.getGithub();
                additionalLabel = "Github";
                icon = "Glasses";
            }
            giant =  {
                name: name,
                id: id,
                email: email,
                role: role,
                additionalMethod: additionalMethod,
                additionalLabel: additionalLabel,
                icon: icon,
            }
            teamArray.push(giant);
    
    
    
        } createHtmlString(teamArray);
    }
    const createHtmlString = (teamArray )=>{
        let htmlText = ` <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
        
            <title>Document</title>
        </head>
        <body>
        
        <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4">My Team </h1>
        </div>
      </div>
      <br><br>
    <div id="teamCard" class="container d-flex flex-wrap justify-content-center align-items-center">
    `;
    
      let extraStuff; 
        for(let employee of teamArray){
            if (employee.additionalLabel === "Github"){
                extraStuff = `<a href="https://github.com/${employee.additionalMethod}">${employee.additionalMethod}</a>`
            } else {
                extraStuff = employee.additionalMethod;
            } 
            htmlText = htmlText.concat(
                `<div class="card" style="width: 18rem;">
                <div class="card-body" style="background-color: #132240;">
                  <h5 class="card-title" style="color: white;">${employee.name}</h5>
                  <h5 class="card-title" style="color: white;">${employee.role}</h5>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Employee ID: ${employee.id}</li>
                  <li class="list-group-item"> <a href="mailto:${employee.email}">Email: ${employee.email}</a></li>
                  <li class="list-group-item">${employee.additionalLabel}: ${extraStuff}</li>
                </ul>
              </div>
                `
            )
        }
        htmlText=htmlText.concat(
            `
            </div>
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
            
            </body>
            </html>
            `
        )
    
      createHtmlDoc(htmlText);
    
    }
    function createHtmlDoc(data) {
        fs.writeFile('team.html', `${data}`, (err) => {
            err ? console.log(err) : console.log("Document Created!")

        });
    }
    

    
    




managerPrompt();

