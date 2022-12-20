import { Component, Injector } from '@angular/core';
import { NgSLangService } from 'projects/ngsebru-lib/src/lib/services/lang.service';
import { SetNgSInjector } from 'projects/ngsebru-lib/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private langService: NgSLangService,
    private injector: Injector
  ) {
    SetNgSInjector(this.injector)
    this.langService.loadGermanDefaults()
  }

}
