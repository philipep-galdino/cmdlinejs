const inquirer = require('inquirer');

module.exports = {
    askGithubCredentials: () => {
        // prompts the user for their credentials
        
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter your Github username or e-mail address: ',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please, enter your username or e-mail!';
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter your password',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please, enter your password!';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },

    get2FactorAuthCode: () => {
        return inquirer.prompt({
            name: 'TwoFactorAuthCode',
            type: 'input',
            message: 'Type in your two-factor authentication code, please',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please, just enter your two-factor authentication code.'
                }
            }
        });
    },

    askRepoDetails: () => {
        const argv = require('minimist')(process.argv.slice(2));

        // uses minimist package to proceed with questions and user input 
        // into the CLI, storing them as object

        const questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Type in the name of the repository: ',
                default: argv._[0] || files.getCurrentDirectoryBase(),
                validate: function (value) {
                    if (value.length){
                        return true;
                    } else {
                        return 'Please, just enter the name of your repository.';
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                default: argv._[1] || null,
                message: 'Enter a description for your repository (optional):'
            },
            {
                type: 'list',
                name: 'visibility',
                message: 'Public or Private? ',
                choices: ['public', 'private'],
                default: 'public'
            }
        ];
        return inquirer.prompt(questions);
    },

    askIgnoreFiles: (filelist) => {
        const questions = [
            {
                type: 'checkbox',
                name: 'ignore',
                message: 'Select the files or folders to be added on the .gitignore: ',
                choices: filelist,
                default: ['node_modules', '.history', 'bower_components']
            }
        ];
        return inquirer.prompt(questions);
        W
    }

};
