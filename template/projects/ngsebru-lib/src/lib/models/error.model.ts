export class NgSError {
    constructor(object: any) {
        Object.assign(this, object)
    }

    public message: String = "";
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