console.log("Employee Management System");
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let employees = [];

if (fs.existsSync("employees.json")) {
  employees = JSON.parse(fs.readFileSync("employees.json"));
}
function saveData(){
  fs.writeFileSync("employees.json", JSON.stringify(employees,null,2));
}
function menu(){
console.log(`
Employee Management System
1. Add Employee
2. List Employees
3. Update Employee
4. Delete Employee
5. Exit
`);

rl.question("Select an option: ", handleChoice);
}
function handleChoice(choice){
  if(choice==="1") addEmployee();
  else if(choice==="2") listEmployees();
  else if(choice==="3") updateEmployee();
  else if(choice==="4") deleteEmployee();
  else if(choice==="5") rl.close();
  else {
    console.log("Invalid option");
    menu();
  }
}
function addEmployee(){

rl.question("Employee Name: ", name=>{
rl.question("Position: ", position=>{
rl.question("Salary: ", salary=>{

if(isNaN(salary)){
console.log("Invalid salary!");
return menu();
}

const emp={
id: Date.now(),
name,
position,
salary:Number(salary)
};

employees.push(emp);
saveData();

console.log("Employee added successfully!\n");
menu();

});
});
});
}
function listEmployees(){

console.log("\nEmployee List:\n");

employees.forEach(e=>{
console.log(`ID: ${e.id}, Name: ${e.name}, Position: ${e.position}, Salary: $${e.salary}`);
});

console.log(`Total employees: ${employees.length}\n`);
menu();
}
function updateEmployee(){

rl.question("Enter ID to update: ", id=>{

const emp = employees.find(e=>e.id==id);

if(!emp){
console.log("Employee not found!");
return menu();
}

rl.question("New Name: ", name=>{
rl.question("New Position: ", position=>{
rl.question("New Salary: ", salary=>{

if(name) emp.name=name;
if(position) emp.position=position;
if(salary && !isNaN(salary)) emp.salary=Number(salary);

saveData();
console.log("Employee updated!\n");
menu();

});
});
});

});
}
function deleteEmployee(){

rl.question("Enter ID to delete: ", id=>{

const index = employees.findIndex(e=>e.id==id);

if(index===-1){
console.log("Employee not found!");
return menu();
}

employees.splice(index,1);
saveData();

console.log("Employee deleted!\n");
menu();
});
}
menu();
