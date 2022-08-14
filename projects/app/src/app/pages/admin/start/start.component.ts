import { Component } from "@angular/core";
import { DayTagToFormattedDayTransformer, NgSChart, NgSCollapsables, NgSLangService, NgSRestService, RestBuilder } from "projects/ng-sebru-lib/src/public-api";
import { MatchLog } from "../../../core/models/Log";
import { LogOverviewResponse } from "../../../core/models/Responses";

@Component({
	templateUrl: "./start.component.html"
})
export class StartComponent {

	public chart: NgSChart = new NgSChart()

	public overviewData: {
		dates: String[]
		logs: MatchLog[],
		days: Number,
		message: String,
		userId: String
	} = {
			dates: [],
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
			dates: this.overviewData.dates,
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
			dates: this.overviewData.dates,
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
			this.overviewData.dates = Object.keys(logOverview.dates)
			Object.keys(logOverview.dates).forEach((key) => {
				this.chart.addValue(new DayTagToFormattedDayTransformer(key).result(), logOverview.dates[key])
			})
			if (this.ngSCollapsables.elements.length != this.chart.labels.length) {
				this.ngSCollapsables = new NgSCollapsables(this.chart.labels.slice().reverse())
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
		const restBuilder = new RestBuilder(this.restService).addAuthenticationType("admin").setUrl("log").addParam("day", this.overviewData.dates[this.overviewData.dates.length - 1 - (this.ngSCollapsables.currentOpen as number)])
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