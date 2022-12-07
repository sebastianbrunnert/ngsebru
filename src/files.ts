import fs from "fs";
import path from "path";
import exec from "child_process";

export class FilesRunner {

    constructor(
        private name: String,
        private cssLib: "bt" | "tw",
        private backend: Boolean
    ) { }

    public bootstrap() {
        // TODO:
        // dominio
        // CSS Lib
        this.copyFolder(path.join(__dirname + "/../template/"), this.name + "/projects");
        fs.writeFileSync(this.name + "/.gitignore", "/dist\n/tmp\n/out-tsc\n/bazel-out\n/node_modules\nchrome-profiler-events*.json\n/.idea\n.project\n.classpath\n.c9\n*.launch\n.settings/\n.sublime-workspace\n.vscode/*\n!.vscode/settings.json\n!.vscode/tasks.json\n!.vscode/launch.json\n!.vscode/extensions.json\n.history/*\n/angular/cache\n/.sass-cache\n/connect.lock\n/coverage\n/libpeerconnection.log\nnpm-debug.log\nyarn-error.log\ntestem.log\n/typing\n.DS_Store\nThumbs.db\n/projects/ngsebru-lib/node_modules\n/.angular");
    }

    public install() {
        exec.execSync("cd " + this.name + " && npm i", { stdio: "inherit" });
    }

    private copyFolder(source, target) {
        var exists = fs.existsSync(source);
        var stats = exists && fs.lstatSync(source);
        var isDirectory = exists && stats.isDirectory();

        if (isDirectory) {
            // Checking if the folder should be copied or not.
            target = this.unrestricted(target);
            if (target === false) return;

            fs.mkdirSync(target);
            fs.readdirSync(source, { withFileTypes: true }).forEach((dirent) => {
                this.copyFolder(path.join(source, dirent.name), path.join(target, dirent.name));
            });
        } else {
            const targetPath = path.parse(target);
            target = this.unrestricted(targetPath.name)
            if (target === false) return;
            target = path.join(targetPath.dir, target + targetPath.ext);

            fs.copyFileSync(source, target);
        }
    }

    /*
    For specific settings, just specific files / folders should be copied.
    This function checks if the file / folder should be copied or not.

    Examples:
    - If the user wants to use TailwindCSS, the file "src/app/app.component_ngbt.scss" should not be copied.
    - If the user wants to use a SSR-backend, the file "src/app/app.component_ngbe.ts" should be copied.
    - If the user wants to use no SSR-backend, the file "src/app/app.component_ngnbe.ts" should be copied.
    - If the user wants to use a TailwindCSS, the folder "src/app_ngtw" should be copied.
    - If the user wants to use Bootstrap and no SSR-backend, the folder "src/app/example_ngnbe,ngbt" should be copied.

    The conditional parts of the file / folder name are separated by "_" and the conditions by ",". These conditions will be removed from the file / folder name.
    */
    private unrestricted(source: String): Boolean | String {
        if (!source.includes("_")) {
            return source;
        }

        const sourcePath = source.split("_")

        const requirements = sourcePath.pop().split(",")
        if (requirements.includes("ngbe") && !this.backend) {
            return false;
        }
        if (requirements.includes("ngnbe") && this.backend) {
            return false;
        }
        if (requirements.includes("ngbt") && this.cssLib == "tw") {
            return false;
        }
        if (requirements.includes("ngtw") && this.cssLib == "bt") {
            return false;
        }

        return sourcePath.join("_");
    }

}