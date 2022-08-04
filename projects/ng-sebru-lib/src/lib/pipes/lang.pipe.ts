import { Pipe, PipeTransform } from "@angular/core";
import { NgSInjector } from "../../public-api";
import { NgSLangService } from "../services/lang.service";

@Pipe({
	name: "lang",
	pure: false
})
export class NgSLangPipe implements PipeTransform {
	constructor(private langService: NgSLangService) {}

	transform(key: String): any {
		return this.langService.language.getTranslation(key)
	}
}