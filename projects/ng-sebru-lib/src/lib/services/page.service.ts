import { ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgSViewContainerRef } from '../../public-api';
import { NgSAlert } from '../models/Alert';

@Injectable({
  providedIn: 'root'
})
export class NgSPageService {

	constructor(
		private title: Title,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver
	) {}

	private alerts: NgSAlert[] = []
	private spinners: String[] = []

	public alert(alert: NgSAlert) {
		if(!alert.id) {
			alert.id = ""
		}

		var findAlert = this.alerts.find(alertF => alertF.id == alert.id)
		if(findAlert) {
			findAlert.message = alert.message
			findAlert.type = alert.type
		} else {
			this.alerts.push(alert)
		}

		this.getElement("#alert-" + alert.id).then(alert => {
			alert.scrollIntoView()
		})
	}

	public findAlert(id: String): NgSAlert {
		return this.alerts.find(alert => alert.id == id)!
	}

	public removeAlert(id: String) {
		this.alerts = this.alerts.filter(alert => alert.id != id)
	}

	public removeAlerts() {
		this.alerts = []
	}

	public startSpinner(id: String = "") {
		this.spinners.push(id)
		this.getElement("#spinner-" + id).then(spinner => {
			spinner.scrollIntoView()
		})
	}

	public stopSpinner(id: String = "") {
		this.spinners = this.spinners.filter(spinner => spinner != id)
	}

	public isSpinning(id: String = ""): boolean {
		return this.spinners.includes(id)
	}

	public setTitle(title: String) {
		this.title.setTitle(title as string)
	}

	public navigate(url: String) {
		this.router.navigate([url])
	}

	public getElement(selector: String): Promise<any> {
		return new Promise(resolve => {
			if (document.querySelector(selector as string)) {
				return resolve(document.querySelector(selector as string));
			}
	
			const observer = new MutationObserver(mutations => {
				if (document.querySelector(selector as string)) {
					resolve(document.querySelector(selector as string));
					observer.disconnect();
				}
			});
	
			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		});
	}

	public createComponent<T>(type: Type<T>): ComponentRef<T> {
		const factory = this.componentFactoryResolver.resolveComponentFactory(type);
		return NgSViewContainerRef.createComponent<T>(factory);
	}
}