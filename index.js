const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const github = require('./lib/github');

clear();

console.log(
    chalk.green(
        figlet.textSync('SuperGit', { horizontalLayout: 'full' })
    )
);

// checks if the directory is a git repository 

//if (files.directoryExists('.git')) {
//    console.log(chalk.red('Already a git repository!'));
//    process.exit();
//}

// runs the methods for the github authentication

const run = async () => {
    let token = github.getStoredGithubToken();
    if (!token) {
        token = await github.getPersonalAccessToken();
    }
    console.log(token);
}

run();