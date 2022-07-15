import { Component, ViewContainerRef } from '@angular/core';
import { SetNgSViewContainerRef } from 'projects/ng-sebru-lib/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    viewContainerRef: ViewContainerRef
  ) {
    SetNgSViewContainerRef(viewContainerRef)
  }
}
