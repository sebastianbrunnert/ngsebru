import { Component, Input } from "@angular/core";

@Component({
    template: ""
})
export class NgSChartComponent {
    @Input("ngSChart")
    public ngSChart: NgSChart = new NgSChart()

    public primary: String = getComputedStyle(document.body).getPropertyValue("--bs-primary")
    public body: String = getComputedStyle(document.body).getPropertyValue("--bs-body-color")
}

@Component({
    selector: "ngs-line-chart",
    templateUrl: "./line-chart.component.html"
})
export class NgSLineChartComponent extends NgSChartComponent {}  

@Component({
    selector: "ngs-bar-chart",
    templateUrl: "./bar-chart.component.html"
})
export class NgSBarChartComponent extends NgSChartComponent {}  

export class NgSChart {

    public title: String = ""

    public labels: String[] = []
    public values: any[] = []

    public addValue(label: String, value: any) {
        this.labels.push(label)
        this.values.push(value)
    }

    public reset() {
        this.labels = []
        this.values = []
    }

}