import { Component, Input } from '@angular/core';
import { NgSPageService } from '../../services/page.service';

@Component({
  	selector: 'ngs-spinner',
	templateUrl: "./spinner.component.html"
})
export class NgSSpinnerComponent {

	@Input("id") 
	public id: String = ""
	
    constructor(
		public pageService: NgSPageService
	) {}

}