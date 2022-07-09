export class NgSError {
	constructor(object) {
		Object.assign(this, object)
	}

	public error: String = "";
	public levelDescription: String = "";
	public level: NgSErrorType = NgSErrorType.UNKNOWN
}

export enum NgSErrorType {
	UNKNOWN = "UNKNOWN",
    IGNORE = "IGNORE",
    INTERN = "INTERN",
    ALERT = "ALERT",
    LOGOUT = "LOGOUT",
    INPUT = "INPUT"
}