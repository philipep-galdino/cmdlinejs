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
    }

};
