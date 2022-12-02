import packegeJsonTemplate from "./templates/package.json";
import fs from "fs";

export class ConfigsRunner {

    constructor(
        private name: String
    ) { }

    public packageJson() {
        packegeJsonTemplate.name = this.name as string;
        fs.writeFileSync(`${this.name}/package.json`, JSON.stringify(packegeJsonTemplate, null, 4));
    }
}