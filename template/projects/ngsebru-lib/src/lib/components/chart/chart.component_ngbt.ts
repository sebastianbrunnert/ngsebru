import { Component, Input } from "@angular/core"
import { NgChartsModule } from "ng2-charts"

export class NgSChart {
    public title?: String = ""

    constructor(title?: String) {
        this.title = title
    }

    public labels: String[] = []
    public values: Number[] = []

    public addValue(label: String, value: Number): NgSChart {
        this.labels.push(label)
        this.values.push(value)
        return this
    }

    public reset() {
        this.labels = []
        this.values = []
    }
}

@Component({
    template: "",
    standalone: true,
    imports: [NgChartsModule]
})
export class NgSChartComponent {

    @Input("chart")
    public ngSChart: NgSChart = new NgSChart("")

    public primary: String = getComputedStyle(document.body).getPropertyValue("--bs-primary")
    public body: String = getComputedStyle(document.body).getPropertyValue("--bs-body-color")

    public options = { responsive: true, scale: { ticks: { precision: 0 } } }

}

@Component({
    selector: "ngs-line-chart",
    templateUrl: "./line-chart.component.html",
    standalone: true,
    imports: [NgChartsModule]
})
export class NgSLineChartComponent extends NgSChartComponent { }