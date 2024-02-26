import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Type } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NgSViewContainerRef } from "../../public-api";
import { NgSAlert } from "../components/alert/alert.component";

@Injectable({
    providedIn: 'root'
})
export class NgSPageService {

    constructor(
        private title: Title,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    private alerts: NgSAlert[] = []

    public alert(alert: NgSAlert) {
        if (!alert.id) {
            alert.id = ""
        }

        var findAlert = this.alerts.find(alertF => alertF.id == alert.id)
        if (findAlert) {
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

    public setTitle(title: String) {
        this.title.setTitle(title as string)
    }

    public navigate(url: String) {
        window.location.href = url as string
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

    public createFactory<T>(type: Type<T>): ComponentFactory<T> {
        return this.componentFactoryResolver.resolveComponentFactory(type);
    }

    public createComponent<T>(type: Type<T>): ComponentRef<T> {
        const factory = this.componentFactoryResolver.resolveComponentFactory(type);
        return NgSViewContainerRef.createComponent<T>(factory);
    }

}