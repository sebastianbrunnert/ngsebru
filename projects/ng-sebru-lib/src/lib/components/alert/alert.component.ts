import { Component, Input } from '@angular/core';
import { NgSPageService } from '../../services/page.service';

@Component({
  	selector: 'ngs-alert',
	templateUrl: './alert.component.html'
})
export class NgSAlertComponent {

	@Input("id") 
	public id: String = ""
	
    constructor(
		public pageService: NgSPageService
	) {}

}