export class NgSAlert {
	public id?: String = ""
	public type: NgSAlertType = NgSAlertType.DEFAULT
	public message: String = ""
}

export enum NgSAlertType {
	DANGER = "danger",
	SUCCESS = "success",
	DEFAULT = "primary"
}