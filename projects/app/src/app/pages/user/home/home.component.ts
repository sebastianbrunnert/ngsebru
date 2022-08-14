import { Component } from "@angular/core";
import { NgSPageService } from "projects/ng-sebru-lib/src/public-api";

@Component({
	templateUrl: "./home.component.html"
})
export class HomeComponent {

	constructor(
		public pageService: NgSPageService
	) {

	}

}