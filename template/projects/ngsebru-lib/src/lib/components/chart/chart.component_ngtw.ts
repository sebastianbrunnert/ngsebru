import { Component, Input } from "@angular/core"
import { NgChartsModule } from "ng2-charts"
import resolveConfig from 'tailwindcss/resolveConfig'
import myConfig from 'tailwind.config.js'

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

    public body: String = ""

    public primary: String = ""

    constructor() {
        const tailwindConfig = resolveConfig(myConfig)
        this.body = tailwindConfig.theme.colors.gray["900"]
        this.primary = tailwindConfig.theme.colors.blue["500"]
    }

    public options = { responsive: true, scale: { ticks: { precision: 0 } } }

}

@Component({
    selector: "ngs-line-chart",
    templateUrl: "./line-chart.component.html",
    standalone: true,
    imports: [NgChartsModule]
})
export class NgSLineChartComponent extends NgSChartComponent { }