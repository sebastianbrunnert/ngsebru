import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { NgSColor, NgSCustomColor } from "../../models/color.model";
import { SafeHtmlPipe } from "../../pipes/safe-html.pipe";
import { IsEmptyCheck } from "../../services/data.service";

@Component({
    selector: "ngs-icon",
    standalone: true,
    templateUrl: "./icon.component.html",
    imports: [HttpClientModule, SafeHtmlPipe]
})
export class NgSIconComponent implements OnInit {

    @Input("type")
    public type: String = "";

    @Input("size")
    public size: Number = NgSIconSize.SMALL;

    @Input("color")
    public color: String | NgSCustomColor = NgSColor.DARK;

    public iconText: String = "";

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        if (new IsEmptyCheck(this.type).result()) {
            this.type = "error";
        }
        this.loadIcon(this.type);
    }

    private loadIcon(icon: String) {
        this.http.get("./assets/icons/" + icon + ".svg", { responseType: "text" }).subscribe((data: String) => {
            this.iconText = data;
        }, (error) => {
            this.loadIcon("error");
        })
    }

    get usesCustomColor(): boolean {
        return this.color instanceof NgSCustomColor;
    }

    get customColorCode(): String {
        return (this.color as NgSCustomColor).code;
    }

}

export class NgSIconSize {
    public static SMALL: Number = 20;
    public static MEDIUM: Number = 32;
    public static LARGE: Number = 48;
}

export class NgSIconType {
    public static EMAIL: String = "email";
    public static ERROR: String = "error";
    public static USER: String = "user";
    public static BURGER: String = "burger";
    public static HOME: String = "home";
    public static PLUS: String = "plus";
    public static MINUS: String = "minus";
    public static SEARCH: String = "search";
    public static CALENDAR: String = "calendar";
    public static LEFT_ARROW: String = "left";
    public static RIGHT_ARROW: String = "right";
    public static CLOSE: String = "close";
    public static MENU: String = "menu";
    public static LOGOUT: String = "logout";
    public static PHOTOS: String = "photos";
    public static SLIDE_SHOW: String = "slideshow";
    public static TV: String = "tv";
}