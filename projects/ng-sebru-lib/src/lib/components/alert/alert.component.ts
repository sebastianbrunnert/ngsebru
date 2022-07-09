import { Component, Input } from '@angular/core';
import { NgSAlert } from '../../models/Alert';
import { NgSPageService } from '../../services/page.service';

@Component({
  	selector: 'ngs-alert',
	templateUrl: './alert.component.html'
})
export class NgSAlertComponent {

	@Input("id") 
	public id: String = ""
	
	public alert: NgSAlert = new NgSAlert()

    constructor(
		public pageService: NgSPageService
	) {}

}