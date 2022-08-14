import { Component } from "@angular/core";
import { DayTagToFormattedDayTransformer, NgSChart, NgSCollapsables, NgSLangService, NgSNavigation, NgSRestService, RestBuilder } from "projects/ng-sebru-lib/src/public-api";
import { MatchLog } from "../../../core/models/Log";
import { LogOverviewResponse } from "../../../core/models/Responses";

@Component({
	templateUrl: "./start.component.html"
})
export class StartComponent {

	public navigation: NgSNavigation = {
		titleHtml: "<span class='text-secondary'>match</span><span class='text-body-bg'>heroes</span>",
		items: [
			{ title: "Überblick", url: "super-admin/start", classes: ["text-body-bg", "rounded"] },
			{ title: "Abmelden", action: () => { this.restService.getAuthenticationType("admin")?.onLogout() }, classes: ["text-body-bg", "rounded"] }
		],
		classes: ["bg-primary"],
		barsClasses: ["text-body-bg"]
	}

	public chart: NgSChart = new NgSChart()

	public overviewData: {
		logs: MatchLog[],
		days: Number,
		message: String,
		userId: String
	} = {
			logs: [],
			days: 30,
			message: "",
			userId: ""
		}

	public overviewStats: {
		clicksToday: Number,
		individualClicksToday: Number,
		actionsToday: Number,
		actionsTotal: Number
	} = {
			clicksToday: 0,
			individualClicksToday: 0,
			actionsToday: 0,
			actionsTotal: 0
		}

	public ngSCollapsables: NgSCollapsables = new NgSCollapsables()

	constructor(
		private restService: NgSRestService,
		private langService: NgSLangService
	) {
		this.langService.getPromise().then(() => {
			this.chart.title = this.langService.getTranslation("ACTIONS")
		})
		this.loadLogOverview()
	}

	public setDays(days: Number) {
		this.overviewData = {
			logs: this.overviewData.logs,
			days: days,
			message: this.overviewData.message,
			userId: ""
		}
		this.loadLogOverview()
		this.ngSCollapsables.currentOpen = -1
	}

	public setUserId(userId: String) {
		this.overviewData = {
			logs: this.overviewData.logs,
			days: this.overviewData.days,
			message: this.overviewData.message,
			userId: userId
		}
		this.loadLogOverview()
		this.loadLogs()
	}

	public setMessage(message: String) {
		this.overviewData.message = message
		this.loadLogOverview()
		this.loadLogs()
	}

	public loadLogOverview() {
		const restBuilder = new RestBuilder(this.restService).addAuthenticationType("admin").setUrl("log").addParam("days", this.overviewData.days.toString())
		if (this.overviewData.userId) {
			restBuilder.addParam("userId", this.overviewData.userId)
		}
		if (this.overviewData.message) {
			restBuilder.addParam("message", this.overviewData.message)
		}
		restBuilder.get().then((logOverview: LogOverviewResponse) => {
			this.chart.reset()
			Object.keys(logOverview.dates).forEach((key) => {
				this.chart.addValue(key, logOverview.dates[key])
			})
			if (this.ngSCollapsables.elements.length != this.chart.labels.length) {
				this.ngSCollapsables = new NgSCollapsables(this.chart.labels.slice().reverse().map((label: String) => new DayTagToFormattedDayTransformer(label).result()))
				this.ngSCollapsables.onOpen = () => {
					this.loadLogs()
				}
			}
			this.overviewStats = {
				clicksToday: logOverview.clicksToday,
				individualClicksToday: logOverview.individualClicksToday,
				actionsToday: Object.values(logOverview.dates).pop(),
				actionsTotal: Object.values(logOverview.dates).reduce((acc, cur) => acc + cur, 0)
			}
		})
	}

	public loadLogs() {
		const restBuilder = new RestBuilder(this.restService).addAuthenticationType("admin").setUrl("log").addParam("day", this.chart.labels[this.chart.labels.length - 1 - (this.ngSCollapsables.currentOpen as number)])
		if (this.overviewData.userId) {
			restBuilder.addParam("userId", this.overviewData.userId)
		}
		if (this.overviewData.message) {
			restBuilder.addParam("message", this.overviewData.message)
		}
		restBuilder.get().then((logs: MatchLog[]) => {
			this.overviewData.logs = logs
		})
	}
}