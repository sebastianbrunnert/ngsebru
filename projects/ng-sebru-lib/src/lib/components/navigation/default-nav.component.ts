import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngs-default-nav',
    templateUrl: './default-nav.component.html'
})
export class NgSDefaultNavigationComponent {

    @Input("ngSNavigation")
    public navigation: NgSNavigation = new NgSNavigation()

}

export class NgSNavigation {
    public titleHtml?: String = ""
    public imageUrl?: String = ""
    public items?: NgSNavigationItem[] = []
    public classes?: String[] = []
    public barsClasses?: String[] = []
}

export class NgSNavigationItem {
    public title: String = ""
    public url?: String = ""
    public action?: Function = () => { }
    public icon?: String = ""
    public classes?: String[] = []
    public subItems?: NgSNavigationItem[] = []
}