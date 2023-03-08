export class NgSColor {
    public static DANGER = "danger";
    public static SUCCESS = "success";
    public static WARNING = "warning";
    public static INFO = "info";
    public static PRIMARY = "primary";
    public static SECONDARY = "secondary";
    public static LIGHT = "light";
    public static DARK = "dark";
    public static MUTED = "muted";
    public static WHITE = "white";
}

export class NgSCustomColor {
    public code: String;

    constructor(code: String) {
        this.code = code;
    }
}