#! /usr/bin/env node

import { prompt } from 'inquirer';
import { createSpinner } from 'nanospinner';

import fs from 'fs';
import { ConfigsRunner } from './configs';

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
    }
];

prompt(questions).then((answers: { name: String, cssLib: String }) => {
    // Check if name is valid (not empty, no spaces, just letters and numbers)
    if (answers.name === "" || answers.name.match(/[^a-zA-Z0-9]/)) {
        createSpinner("Invalid name!").error()
        return;
    }

    // Check if folder exists
    if (fs.existsSync(answers.name as string)) {
        createSpinner("Folder already exists!").error()
        return;
    }

    const spinner = createSpinner("Creating project...").start()

    // Create folder
    fs.mkdirSync(answers.name as string);

    const configs = new ConfigsRunner(answers.name);
    configs.packageJson();

    setTimeout(() => {
        spinner.success({
            text: "Project created!",
        })
    }, 1000)
})