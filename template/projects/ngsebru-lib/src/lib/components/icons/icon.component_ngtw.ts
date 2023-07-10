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
    public color: String | NgSCustomColor = NgSColor.GRAY_500;

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
    public static SMALL: Number = 5;
    public static MEDIUM: Number = 8;
    public static LARGE: Number = 12;
}

export class NgSIconType {
    public static ADMIN: String = "admin";
    public static BOTTOM: String = "bottom";
    public static BURGER: String = "burger";
    public static CALENDAR: String = "calendar";
    public static CHECK: String = "check";
    public static CLOSE: String = "close";
    public static CODE: String = "code";
    public static DELETE: String = "delete";
    public static DOWNLOAD: String = "download";
    public static DRAG: String = "drag";
    public static EDIT: String = "edit";
    public static EMAIL: String = "email";
    public static ERROR: String = "error";
    public static EYE: String = "eye";
    public static FILES: String = "files";
    public static FOLDER: String = "folder";
    public static GRID: String = "grid";
    public static HOME: String = "home";
    public static IMAGE: String = "image";
    public static KEY: String = "key";
    public static LEFT: String = "left";
    public static LOGOUT: String = "logout";
    public static MENU: String = "menu";
    public static MINUS: String = "minus";
    public static MONEY: String = "money";
    public static MOVEFILE: String = "movefile";
    public static MOVIE: String = "movie";
    public static ORGANISATION: String = "organisation";
    public static PHOTOS_ADD: String = "photos-add";
    public static PHOTOS: String = "photos";
    public static PLAYLISTS: String = "playlists";
    public static PLUS: String = "plus";
    public static RENAME: String = "rename";
    public static RIGHT: String = "right";
    public static ROCKET: String = "rocket";
    public static SEARCH: String = "search";
    public static SETTINGS: String = "settings";
    public static SLIDESHOW: String = "slideshow";
    public static SUPPORT: String = "support";
    public static TABLE: String = "table";
    public static TEXT: String = "text";
    public static TV: String = "tv";
    public static UPLAOD: String = "upload";
    public static USER: String = "user";
}