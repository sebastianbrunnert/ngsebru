export class MatchLog {
    public message: String = "LOG_NOT_FOUND";
    public timeStamp: Number = -1;
    public userId?: String;
    public description?: String;
    public exception?: String;
    public level = LogType.UNKNOWN
}

export enum LogType {
    UNKNOWN = "UNKNOWN",
    LOW = "LOW",
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR"
}