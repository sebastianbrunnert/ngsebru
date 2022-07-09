import { Component, ViewContainerRef } from '@angular/core';
import { SetNgSViewContainerRef } from 'projects/ng-sebru-lib/src/public-api';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private viewContainerRef: ViewContainerRef
  ) {
    SetNgSViewContainerRef(viewContainerRef)
  }
}
