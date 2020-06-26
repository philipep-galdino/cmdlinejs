const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const github = require('./lib/github');
const repo = require('./lib/repo');

clear();

console.log(
    chalk.green(
        figlet.textSync('SuperGit', { horizontalLayout: 'full' })
    )
);

const getGithubToken = async () => {
    let token = github.getStoredGithubToken();
    if (token) {
        return token
    }

    // if the token was not found, uses credentials to access github
    token = await github.getPersonalAccessToken();

    return token;
};


const run = async () => {
    try {
        const token = await getGithubToken();
        github.githubAuth(token);

        const url = await repo.createRemoteRepo();
        await repo.createGitignore();
        await repo.setupRepo(url);

        console.log(chalk.green('Done!'));
    } catch (err) {
        if (err) {
            switch (err.status) {
                case 401:
                    console.log(chalk.red('Could not log you in. Check your credentials/token'))
                    break;
                case 422:
                    console.log(chalk.red('There is already a repo or token with the same name!'))
                    break;
                default:
                    console.log(chalk.red(err));       
            }
        }
    }
};

run();
