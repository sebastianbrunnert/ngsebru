export class NgSColor {
    public static SLATE_50 = "slate-50";
    public static SLATE_100 = "slate-100";
    public static SLATE_200 = "slate-200";
    public static SLATE_300 = "slate-300";
    public static SLATE_400 = "slate-400";
    public static SLATE_500 = "slate-500";
    public static SLATE_600 = "slate-600";
    public static SLATE_700 = "slate-700";
    public static SLATE_800 = "slate-800";
    public static SLATE_900 = "slate-900";

    public static GRAY_50 = "gray-50";
    public static GRAY_100 = "gray-100";
    public static GRAY_200 = "gray-200";
    public static GRAY_300 = "gray-300";
    public static GRAY_400 = "gray-400";
    public static GRAY_500 = "gray-500";
    public static GRAY_600 = "gray-600";
    public static GRAY_700 = "gray-700";
    public static GRAY_800 = "gray-800";
    public static GRAY_900 = "gray-900";

    public static get(name: "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "yellow" | "amber" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" | "white" | "black", shade: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900): String {
        return `${name}-${shade}`;
    }
}

export class NgSCustomColor {
    public code: String;

    constructor(code: String) {
        this.code = code;
    }
}
