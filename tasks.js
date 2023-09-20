
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
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
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
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Abdulaziz")


//the following function displays all the available commands 
function showHelp() {
  console.log('Available commands:');
  console.log('  - hello:says hello!');
  console.log('  - hello "your name":says hello your name!');
  console.log('  - help: Show available commands');
  console.log('  - exit/quit: Exit the application');
}