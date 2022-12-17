import packegeJsonTemplate from "./configs/package_temp.json";
import angularJsonTemplate from "./configs/angular_temp.json";
import tsConfigTemplate from "./configs/tsconfig_temp.json";
import fs from "fs";

export class ConfigsRunner {

    constructor(
        private name: String
    ) { }

    public packageJson() {
        packegeJsonTemplate.name = this.name as string
        fs.writeFileSync(`${this.name}/package.json`, JSON.stringify(packegeJsonTemplate, null, 4));
    }

    public angularJson() {
        fs.writeFileSync(`${this.name}/angular.json`, JSON.stringify(angularJsonTemplate, null, 4));
    }

    public tsConfig() {
        fs.writeFileSync(`${this.name}/tsconfig.json`, JSON.stringify(tsConfigTemplate, null, 4));
    }
}