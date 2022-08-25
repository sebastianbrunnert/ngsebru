import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSebruLibModule } from 'projects/ng-sebru-lib/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgSebruLibModule,
		CoreModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
