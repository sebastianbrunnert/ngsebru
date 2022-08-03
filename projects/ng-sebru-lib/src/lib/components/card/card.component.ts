import { Component, Input } from '@angular/core';

@Component({
  	selector: 'ngs-card',
	templateUrl: './card.component.html'
})
export class NgSCardComponent {

	@Input("title")
	public title: String = ""
	
}