import { Pipe, PipeTransform } from "@angular/core";
import { NgSLangService } from "../services/lang.service";

@Pipe({
    name: "lang",
    pure: false,
    standalone: true
})
export class NgSLangPipe implements PipeTransform {
    constructor(private langService: NgSLangService) { }

    transform(key: String): any {
        return this.langService.language.getTranslation(key)
    }
}