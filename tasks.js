const { isUtf8 } = require('buffer');
const { error } = require('console');

/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
let loadedFile='database.json'
const process=require('process')
const fs =require('fs')

var args=process.argv
if (args[2]){
  loadedFile=args[2]
}

let newArr=[]
let readData=JSON.stringify(newArr)

if(fs.existsSync(loadedFile)){
  console.log('already exist')
  
}else{
  fs.appendFile(loadedFile, readData,(err)=>{
if (err) console.log(err)
  })

}



async function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
   
  const fs =require('fs')

  try{
await fs.readFile(loadedFile, {encoding: 'utf-8'}, (error, loadData)=>{
  taskArr=JSON.parse(loadData)
})

  }
  catch(error){
    console.log(error)
  }
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  const input = text.replace('\n', '').trim();
  if (text === 'quit\n' || text ==='exit\n') {
    quit();
  }
  else if (input.startsWith("hello")){
    const args=input.split(" ")
    if(args.length>1){
      const name=args.slice(1).join(' ');
      hello(name)
    }else {
      hello(" ")
    }
  }
  else if(text==='list\n'){
    listTasks();
  }
  else if(text.trim().split(" ")[0]==='add'){
    addToList(text);
  }
  else if(text.trim().split(" ")[0]==='remove'){
    remove(text);
  }
  else if (text.trim().slice(0,4)==='edit'){
    edit(text);
  }
  else if(text.trim().split(" ")[0]==='check'){
    let nums=text.split(" ")[1]
    check(nums)
  }
  else if(text.trim().split(" ")[0]==='uncheck'){
    let nums=text.split(" ")[1]
    uncheck(nums)
  }
  else if (text === 'help\n') {
    showHelp();}
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(name){
  if (name ===" "){
    console.log("hello!")
  }else
  console.log(`hello ${name}!`)
}


/**
 * Exits the application
 *
 * @returns {void}
 */



async function quit(){

  const jsonData = JSON.stringify(taskArr);
  const fs = require('fs').promises;

  try{
    await fs.writeFile(loadedFile, jsonData,{encoding : 'utf-8'});
    console.log("donne")

  }
  catch(error){
    console.log(error)

  }

  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Abdulaziz")


//the following function displays all the available commands 
function showHelp() {
  console.log('Available commands:');
  console.log('  - hello:says hello!');
  console.log('  - list:lists all tasks');
  console.log('  - add x:will add the x to the task');
  console.log('  - remove:will remove the last task');
  console.log('  - remove i:will remove the the index you choose');
  console.log('  - hello "your name":says hello your name!');
  console.log('  - help: Show available commands');
  console.log('  - check: the task will be checked');
  console.log('  - uncheck:will uncheck  ');
  console.log('  - exit/quit: Exit the application');
}

let taskArr =[]

function listTasks() {
  let check="[ ]"
  console.log("Tasks:");
  taskArr.forEach((task, index) => {
    if(taskArr[index].status==true) check = "[✓]"
    console.log(`${index + 1}. ${check} ${taskArr[index].task}`);
    check="[ ]"
  });
}

function addToList(text){
  let addTask= text.slice(4);
  let newObj = {task: addTask, status: false}
  if(addTask.length >0){
    taskArr.push(newObj)

  }
  
}
function remove(text){
  var secondW=text.trim().split(' ')[1]
  // for(let i=0;i<task.length; i++){
  if(secondW==undefined){
    taskArr.pop()
  }else if(secondW> taskArr.length){
    console.log("this number doesn't exist")
  }
     else {
        taskArr.splice((secondW-1),1)
      }
    }

  
  
//}  // else if(secondW){
  //   for(let i =0 ; i<task.length; i++){
  //     if(secondW != task[i+1]){
  //       console.log("this number doesn't exist")
  //     }
  //  function remove(text){
  //   var secondW=text.trim().split(' ')[1]
  //   task.splice((secondW-1),1)
  //  }


function edit(text){
  var editTwo=text.trim().split(' ')
  var num=parseInt(editTwo[1])
  if(editTwo.length===1){
    console.log("error")
  }else if(editTwo.length===2){
    taskArr.pop();
    taskArr.push(editTwo[1])
  }else{
    taskArr.splice(num-1,1 ,editTwo[2]);
  }
}


function check(nums){
  taskArr[nums -1].status=true;
}
function uncheck(nums){
  taskArr[nums -1].status=false;
}