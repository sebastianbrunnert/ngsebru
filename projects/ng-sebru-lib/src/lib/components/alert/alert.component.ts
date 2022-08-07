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

export class NgSAlert {
	public id?: String = ""
	public type: NgSAlertType = NgSAlertType.DEFAULT
	public message: String = ""
}

export enum NgSAlertType {
	DANGER = "danger",
	SUCCESS = "success",
	DEFAULT = "primary"
}