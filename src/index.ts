#! /usr/bin/env node

import { prompt } from 'inquirer';
import { createSpinner } from 'nanospinner';

import fs from 'fs';
import { ConfigsRunner } from './configs';
import { FilesRunner } from './files';

const questions = [
    {
        type: "input",
        name: "name",
        message: "What's te name of the project?",
    },
    {
        type: "list",
        name: "cssLib",
        message: "What CSS library do you want to use?",
        choices: ["Bootstrap", "TailwindCSS"],
    },
    {
        type: "confirm",
        name: "backend",
        message: "Do you want to use a SSR-backend?"
    }
];

prompt(questions).then((answers: { name: String, cssLib: String, backend: Boolean }) => {
    if (answers.name === "" || !answers.name.match(/^[a-zA-Z0-9-_]+$/)) {
        createSpinner("Invalid name!").error()
        return;
    }

    if (fs.existsSync(answers.name as string)) {
        createSpinner("Folder already exists!").error()
        return;
    }

    const spinner = createSpinner("Creating project...").start()

    const files = new FilesRunner(answers.name, answers.cssLib == "Bootstrap" ? "bt" : "tw", answers.backend);
    files.bootstrap();

    const configs = new ConfigsRunner(answers.name);
    configs.tsConfig();
    configs.packageJson();
    configs.angularJson();

    files.install();

    spinner.success({
        text: "Project created!",
    })
})