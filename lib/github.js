const CLI = require('clui');
const Configstore = require('configstore');
const { Octokit } = require ('@octokit/rest');

const Spinner = CLI.Spinner;
const { createBasicAuth } = require('@octokit/auth-basic');

const inquirer = require('./inquirer');
const pkg = require('../package.json');

const conf = new Configstore(pkg.name);

let octokit;

module.exports = {
    getInstance: () => {
        // allows other libs to access octokit functions

        return octokit;
    },

    getStoredGithubToken: () => {
        return conf.get('github.token');
    },

    getPersonalAccessToken: async () => {
        const credentials = await inquirer.askGithubCredentials();

        const status = new Spinner('Signing in, just a sec...');
        status.start();

        const auth = createBasicAuth({
            // passes the user credentials to follow up on the auth function

            username: credentials.username,
            password: credentials.password,
            async on2Fa() {
                status.stop();
                const res = await inquirer.get2FactorAuthCode();
                status.start();
                return res.TwoFactorAuthCode
            },
            token: {
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'SuperGit, a super command-line tool for init on Git Repositories!'
            }
        });

        try {
            const res = await auth();

            if (res.token) {
                conf.set('github.token', res.token);
                // if token is present and auth succeeded, it sets the config in for
                // next usage and return the token
                return res.token;
            } else {
                throw new Error("Couldn't find the Github token in the response.");
            }
        }   finally {
            status.stop();
        }
    },

    githubAuth: (token) => {
        // set up an oauth authentication for github
        octokit = new Octokit({
            auth: token
        });
    }

};
