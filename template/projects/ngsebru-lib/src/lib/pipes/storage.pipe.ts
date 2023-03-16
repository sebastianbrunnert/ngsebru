import { Pipe, PipeTransform } from "@angular/core";
import { BytesToStorageTransformer, KilobytesToStorageTransformer, MegabytesToStorageTransformer } from "../services/data.service";

@Pipe({
    name: "bytes",
    pure: false,
    standalone: true
})
export class NgSBytesToStoragePipe implements PipeTransform {
    constructor() { }

    transform(bytes: Number): any {
        return new BytesToStorageTransformer(bytes).result()
    }
}

@Pipe({
    name: "kb",
    pure: false,
    standalone: true
})
export class NgSKilobytesToStroagePipe implements PipeTransform {
    constructor() { }

    transform(kilobytes: Number): any {
        return new KilobytesToStorageTransformer(kilobytes).result()
    }
}

@Pipe({
    name: "mb",
    pure: false,
    standalone: true
})
export class NgSMegabytesToStroagePipe implements PipeTransform {
    constructor() { }

    transform(megabytes: Number): any {
        return new MegabytesToStorageTransformer(megabytes).result()
    }
}

