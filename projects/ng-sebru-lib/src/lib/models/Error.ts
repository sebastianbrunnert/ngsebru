export class NgSError {
	constructor(object) {
		Object.assign(this, object)
	}

	public error: String = "";
	public description: String = "";
	public level: NgSErrorLevel = NgSErrorLevel.UNKNOWN
}

export enum NgSErrorLevel {
	UNKNOWN = "UNKNOWN",
    IGNORE = "IGNORE",
    INTERN = "INTERN",
    ALERT = "ALERT",
    LOGOUT = "LOGOUT",
    INPUT = "INPUT"
}