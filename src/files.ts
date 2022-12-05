import fs from "fs";
import path from "path";
import exec from "child_process";

export class FilesRunner {

    constructor(
        private name: String
    ) { }

    public bootstrap() {
        // TODO:
        // .gitignore
        // _settings.file
        // dominio
        // CSS Lib
        this.copyFolder(path.join(__dirname + "/../template/"), this.name + "/projects");
    }

    public install() {
        exec.execSync("cd " + this.name + " && npm i", { stdio: "inherit" });
    }

    private copyFolder(source, target) {
        var exists = fs.existsSync(source);
        var stats = exists && fs.lstatSync(source);
        var isDirectory = exists && stats.isDirectory();

        if (isDirectory) {
            fs.mkdirSync(target);
            fs.readdirSync(source, { withFileTypes: true }).forEach((dirent) => {
                this.copyFolder(path.join(source, dirent.name), path.join(target, dirent.name));
            });
        } else {
            fs.copyFileSync(source, target);
        }
    }

}