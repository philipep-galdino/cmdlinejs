const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');

clear();

console.log(
    chalk.green(
        figlet.textSync('SuperInit', { horizontalLayout: 'full' })
    )
);

// checks if the directory is a git repository 

//if (files.directoryExists('.git')) {
//    console.log(chalk.red('Already a git repository!'));
//    process.exit();
//}
