import { CommonModule } from "@angular/common";
import { Component, Directive, ElementRef, HostListener, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSInjector } from "projects/ngsebru-lib/src/public-api";
import { NgSLangPipe } from "../../pipes/lang.pipe";
import { IsIteratableCheck, RandomKeyGenerator } from "../../services/data.service";
import { NgSLangService } from "../../services/lang.service";
import { NgSIconComponent } from "../icons/icon.component";
import { NgSEnterLeaveComponent } from "../structure/enter-leave.component";
import { NgSDatepickerComponent } from "../datepicker/datepicker.component";
import { SafeHtmlPipe } from "../../pipes/safe-html.pipe";
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM, XYZ } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import * as olProj from 'ol/proj';
import { NgSPageService } from "../../services/page.service";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HeicDirective } from "../../directives/heic.directive";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as customEditor from '../../../assets/ckeditor.js';

@Directive({
    selector: '[ngSResize]',
    standalone: true
})
export class NgSResizeDirective {

    constructor(private elementRef: ElementRef) { }

    @HostListener('click') onClick() {
        const dropdown = this.elementRef.nativeElement.querySelector('.dropdown-menu');
        const button = this.elementRef.nativeElement.querySelector('.dropdown-toggle');

        const dropdownHeight = dropdown.clientHeight;
        const buttonRect = button.getBoundingClientRect();
        const spaceAbove = buttonRect.top;
        const spaceBelow = window.innerHeight - buttonRect.bottom;

        if (spaceBelow < dropdownHeight && spaceAbove >= dropdownHeight) {
            dropdown.style.bottom = `${button.offsetHeight}px`;
            dropdown.classList.add('mb-2');
        } else {
            dropdown.style.bottom = '';
            dropdown.classList.add('mt-2');
        }
    }
}

@Component({
    selector: "ngs-input",
    templateUrl: "./input.component.html",
    standalone: true,
    styleUrls: ["./input.component.scss"],
    imports: [CommonModule, CKEditorModule, GooglePlaceModule, FormsModule, NgSLangPipe, HeicDirective, SafeHtmlPipe, NgSIconComponent, NgSEnterLeaveComponent, NgSDatepickerComponent, NgSResizeDirective]
})
export class NgSInputComponent {

    @Input("input") public input?: NgSInput;

}

@Component({
    selector: "[ngs-input]",
    templateUrl: "./input.component.html",
    standalone: true,
    styleUrls: ["./input.component.scss"],
    imports: [CommonModule, CKEditorModule, HeicDirective, GooglePlaceModule, NgSInputComponent, FormsModule, NgSLangPipe, SafeHtmlPipe, NgSIconComponent, NgSEnterLeaveComponent, NgSDatepickerComponent, NgSResizeDirective]
})
export class NgSClassInputComponent {

    @Input("input") public input?: NgSInput;

}

export enum NgSInputType {
    TEXT = "text",
    NUMBER = "number",
    TEXT_AREA = "textarea",
    DATE = "date",
    TIME = "time",
    DATE_TIME = "datetime",
    PASSWORD = "password",
    SELECT = "select",
    MULTI_SELECT = "multi-select",
    CUSTOM_FILE = "custom-file",
    COLOR = "color",
    CHECKBOX = "checkbox",
    COORDINATES = "coordinates",
    GROUP = "group",
    SWITCHER = "switcher",
    PLACE = "place",
    EDITOR = "editor",
    MULTI_TEXT = "multi-text"
}

export class NgSInput {

    public id: String = new RandomKeyGenerator().result()

    public value: any = null
    public defaultValue: any = null

    public label: String = ""
    public type: NgSInputType = NgSInputType.TEXT
    public mark: String = ""
    public suffix: String = ""
    public prefix: String = ""
    public required: Boolean = true
    public disabled: Boolean = false
    public icon: String = ""
    public actionIcon: String = ""
    public placeholder: String = "INPUT_DEFAULT_PLACEHOLDER"
    public description: String = ""
    public tooltip: String = ""

    public standalone: Boolean = false

    public showOptional: Boolean = true

    constructor(label: String, type: NgSInputType, id: String = "") {
        this.label = label
        this.type = type
        if (id != "") {
            this.id = id
        }
    }

    public validateInput: (value: any) => Boolean = (value: any) => true;

    public onReset() { }

    public onIconClick() { }

    public onActionIconClick() { }

    public onInput(value: any) {
    }

    public onInputFocus() { }

    public onSubmit() { }

    public checkValidation(): Boolean {
        if (this.mark != "") {
            return false
        }

        let result = this.validateInput(this.value)
        if (!result) {
            if (this.mark == "") {
                const langService = NgSInjector.get(NgSLangService)
                this.mark = langService.getTranslation(this.label) + " " + langService.getTranslation("INPUT_INVALID") + "."
            }
            return false
        }

        return true
    }

    public checkFilled(): Boolean {
        this.mark = ""

        if (!this.required) {
            return true
        }

        let empty = this.value == "" || this.value == null || this.value == undefined || (new IsIteratableCheck(this.value).result() && this.value.length == 0);
        if (empty) {
            const langService = NgSInjector.get(NgSLangService)
            this.mark = langService.getTranslation(this.label) + " " + langService.getTranslation("INPUT_REQUIRED") + "."
        }

        return !empty
    }

    public setRequired(required: Boolean): NgSInput {
        this.required = required
        return this
    }

    public setDisabled(disabled: Boolean): NgSInput {
        this.disabled = disabled
        return this
    }

    public setPlaceholder(placeholder: String): NgSInput {
        this.placeholder = placeholder
        return this
    }

    public setMark(mark: String): NgSInput {
        this.mark = mark
        return this
    }

    public setSuffix(suffix: String): NgSInput {
        this.suffix = suffix
        return this
    }

    public setPrefix(prefix: String): NgSInput {
        this.prefix = prefix
        return this
    }

    public setIcon(icon: String): NgSInput {
        this.icon = icon
        return this
    }

    public setActionIcon(icon: String): NgSInput {
        this.actionIcon = icon
        return this
    }

    public setValue(value: any): NgSInput {
        if (value == null || value == undefined) {
            this.value = value
        } else {
            this.value = new IsIteratableCheck(value).result() ? [...value] : value
        }
        return this
    }

    public setDefaultValue(defaultValue: any): NgSInput {
        this.value = new IsIteratableCheck(defaultValue).result() ? [...defaultValue] : defaultValue
        this.defaultValue = new IsIteratableCheck(defaultValue).result() ? [...defaultValue] : defaultValue
        return this
    }

    public setStandalone(standalone: Boolean): NgSInput {
        this.standalone = standalone
        return this
    }

    public setDescription(description: String): NgSInput {
        this.description = description
        return this
    }

    public setShowOptional(showOptional: Boolean): NgSInput {
        this.showOptional = showOptional
        return this
    }

    public setTooltip(tooltip: String): NgSInput {
        this.tooltip = tooltip
        return this
    }

    public reset() {
        this.value = new IsIteratableCheck(this.defaultValue).result() ? [...this.defaultValue] : this.defaultValue
        this.mark = ""
        this.onReset()
    }

    public submit() {
        if (this.checkFilled() && this.checkValidation()) {
            this.onSubmit()
        }
    }
}

export class NgSTextInput extends NgSInput {
    constructor(label: String, id: String = "") {
        super(label, NgSInputType.TEXT, id)
    }
}

export class NgSTimeInput extends NgSInput {
    constructor(label: String, id: String = "") {
        super(label, NgSInputType.TIME, id)
    }
}

export class NgSPlaceInput extends NgSInput {
    constructor(label: String, id: String = "") {
        super(label, NgSInputType.PLACE, id)
    }

    public onCoordinates(lat: number, lon: number) {
    }

    public handleAddressChange(address: any) {
        this.value = address.name
        this.onCoordinates(address.geometry.location.lat(), address.geometry.location.lng())
    }
}

export class NgSPasswordInput extends NgSInput {
    constructor(label: String, id: String = "") {
        super(label, NgSInputType.PASSWORD, id)
    }
}

export class NgSNumberInput extends NgSInput {

    public min?: Number
    public max?: Number
    public steps: Number = 1
    public slider: Boolean = false

    constructor(label: String, id: String = "") {
        super(label, NgSInputType.NUMBER, id)
    }

    public setMin(min: Number): NgSNumberInput {
        this.min = min
        return this
    }

    public setMax(max: Number): NgSNumberInput {
        this.max = max
        return this
    }

    public setSteps(steps: Number): NgSNumberInput {
        this.steps = steps
        return this
    }

    public setSlider(slider: Boolean): NgSNumberInput {
        this.slider = slider
        return this
    }
}

export class NgSTextAreaInput extends NgSInput {

    public rows: Number = 3

    constructor(label: String, id: String = "") {
        super(label, NgSInputType.TEXT_AREA, id)
    }

    public setRows(rows: Number): NgSTextAreaInput {
        this.rows = rows
        return this
    }
}

export class NgSSwitcherInput extends NgSInput {
    public options: NgSSelectOption[] = []

    constructor(label: String, id: String = "") {
        super(label, NgSInputType.SWITCHER, id)
        this.setDefaultValue(null)
    }

    public addOption(option: NgSSelectOption): NgSSwitcherInput {
        this.options.push(option)
        return this
    }

    public addOptions(options: NgSSelectOption[]): NgSSwitcherInput {
        options.forEach(option => {
            this.addOption(option)
        })
        return this
    }

    public addOptionStrings(options: String[]): NgSSwitcherInput {
        options.forEach(option => {
            this.addOptionString(option, option)
        })
        return this
    }

    public addOptionString(label: String, value: String): NgSSwitcherInput {
        return this.addOption({
            label: label,
            value: value
        })
    }

}

export class NgSMultipleSelectInput extends NgSInput {
    public options: NgSSelectOption[] = []
    public emptyValueDefault: String = ""
    public open: Boolean = false
    public selectLabel: NgSSelectOption[] = []
    public searchbar?: NgSInput

    constructor(label: String, id: String = "") {
        super(label, NgSInputType.MULTI_SELECT, id)
        this.setDefaultValue([])
    }

    public selectAll() {
        this.value = this.options.map(option => option.value)
        this.selectLabel = this.value.map((value: String) => this.options.find(option => option.value == value))
        return this
    }

    public removeOption(id: String): NgSMultipleSelectInput {
        this.options = this.options.filter(option => option.value != id)
        return this
    }

    public addOption(option: NgSSelectOption): NgSMultipleSelectInput {
        if (option.value == this.value) {
            this.selectLabel = [option]
        }
        this.options.push(option)
        return this
    }

    public addOptions(options: NgSSelectOption[]): NgSMultipleSelectInput {
        options.forEach(option => {
            this.addOption(option)
        })
        return this
    }

    public toggle() {
        if (this.disabled) {
            return
        }
        this.open = !this.open
        if (this.open) {
            this.onInputFocus()
        }
    }

    public select(option: NgSSelectOption): NgSMultipleSelectInput {
        if (this.value.includes(option.value)) {
            this.value.splice(this.value.indexOf(option.value), 1)
        } else {
            this.value.push(option.value)
        }
        this.selectLabel = this.value.map((value: String) => this.options.find(option => option.value == value))
        this.onInput(this.value)
        return this
    }

    public setEmptyValueDefault(emptyValueDefault: String): NgSMultipleSelectInput {
        this.emptyValueDefault = emptyValueDefault
        return this
    }

    public activateSearchbar(title: String = ""): NgSMultipleSelectInput {
        this.searchbar = new NgSInput(title, NgSInputType.TEXT, this.id + "_searchbar").setStandalone(true)
        this.searchbar.onInput = (value: String) => {
            if (value == null || value == "") {
                this.options.forEach(option => {
                    option.hidden = false
                })
                return
            }
            this.options.forEach(option => {
                option.hidden = option.label.toLowerCase().startsWith(value.toLowerCase()) == false
            })
        }
        return this
    }

}

export class NgSSelectInput extends NgSInput {
    public options: NgSSelectOption[] = []
    public open: Boolean = false
    public selectLabel: String = ""
    public emptyValueDefault: String = ""
    public searchbar?: NgSInput

    constructor(label: String, id: String = "") {
        super(label, NgSInputType.SELECT, id)
        this.setDefaultValue(null)
    }

    public setValue(value: any): NgSSelectInput {
        this.value = value
        return this;
    }

    public addOption(option: NgSSelectOption): NgSSelectInput {
        if (option.value == this.value) {
            this.selectLabel = option.label
        }
        this.options.push(option)
        return this
    }

    public addOptions(options: NgSSelectOption[]): NgSSelectInput {
        options.forEach(option => {
            this.addOption(option)
        })
        return this
    }

    public addOptionStrings(options: String[]): NgSSelectInput {
        options.forEach(option => {
            this.addOptionString(option, option)
        })
        return this
    }

    public addOptionString(label: String, value: String): NgSSelectInput {
        return this.addOption({
            label: label,
            value: value
        })
    }

    public activateSearchbar(title: String = ""): NgSSelectInput {
        this.searchbar = new NgSInput(title, NgSInputType.TEXT, this.id + "_searchbar").setStandalone(true)
        this.searchbar.onInput = (value: String) => {
            if (value == null || value == "") {
                this.options.forEach(option => {
                    option.hidden = false
                })
                return
            }
            this.options.forEach(option => {
                option.hidden = option.label.toLowerCase().startsWith(value.toLowerCase()) == false
            })
        }
        return this
    }

    public toggle() {
        if (this.disabled) {
            return
        }
        this.open = !this.open
        if (this.open) {
            this.onInputFocus()
        }
    }

    public selectValue(value: String): NgSSelectInput {
        const option = this.options.find(option => option.value == value)
        if (option == null) {
            return this
        }
        return this.select(option)
    }

    public select(option?: NgSSelectOption, emit: boolean = true): NgSSelectInput {
        this.open = false
        if (option == null) {
            this.value = null
            this.selectLabel = ""
            this.onInput(this.value)
            return this;
        }
        this.value = option.value
        this.selectLabel = option.label
        if (emit)
            this.onInput(this.value)
        return this
    }

    public setEmptyValueDefault(emptyValueDefault: String): NgSSelectInput {
        this.emptyValueDefault = emptyValueDefault
        return this
    }
}

export class NgSSelectOption {
    public value?: String = ""
    public label: String = ""
    public hidden?: Boolean = false
    public fixed?: Boolean = false
}

export class NgSColorInput extends NgSInput {
    constructor(label: String, id: String = "") {
        super(label, NgSInputType.COLOR, id)
    }
}

export class NgSCheckboxInput extends NgSInput {
    constructor(label: String, id: String = "") {
        super(label, NgSInputType.CHECKBOX, id)
    }
}

export class NgSCoordinatesInput extends NgSInput {
    private vectorLayer = new VectorLayer({
        source: new VectorSource(),
    });

    constructor(label: String, id: String = "") {
        super(label, NgSInputType.COORDINATES, id)

        NgSInjector.get(NgSPageService).getElement("#map").then(() => {
            const map = new Map({
                layers: [
                    new TileLayer({
                        source: new XYZ({
                            url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
                            attributions: "<a href='https://foundation.wikimedia.org/wiki/Policy:Maps_Terms_of_Use'>Wikimedia maps</a> | Map data © <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
                        }),
                    }),
                ],
                target: 'map',
                view: new View({
                    center: olProj.fromLonLat([10.5, 51.35]),
                    zoom: 5
                })
            })


            map.addLayer(this.vectorLayer);

            const redMarkerStyle = new Style({
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({
                        color: 'red'
                    }),
                    stroke: new Stroke({
                        color: 'black',
                        width: 2
                    })
                })
            });

            if (this.value != null) {
                const feature = new Feature(new Point(olProj.fromLonLat([this.value.lon, this.value.lat])));
                feature.setStyle(redMarkerStyle);
                this.vectorLayer.getSource()!.clear();
                this.vectorLayer.getSource()!.addFeature(feature);
            }

            map.on('click', (evt) => {
                this.select(olProj.toLonLat(evt.coordinate)[1], olProj.toLonLat(evt.coordinate)[0])
            })
        })
    }

    get redMarkerStyle() {
        return new Style({
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                    color: 'red'
                }),
                stroke: new Stroke({
                    color: 'black',
                    width: 2
                })
            })
        })
    }

    public select(lat: number, lon: number) {
        var coordinate = olProj.fromLonLat([lon, lat]);
        const feature = new Feature(new Point(coordinate));
        feature.setStyle(this.redMarkerStyle);
        this.vectorLayer.getSource()!.clear();
        this.vectorLayer.getSource()!.addFeature(feature);

        this.value = {
            lat: lat,
            lon: lon
        }
    }
}

export class NgSDateInput extends NgSInput {

    public min: String = ""
    public max: String = ""
    public blocked: String[] = []

    public open: Boolean = false

    constructor(label: String, id: String = "") {
        super(label, NgSInputType.DATE, id)
        this.setIcon("calendar")
        this.setPlaceholder("INPUT_DEFAULT_CHOOSE")
    }

    public setMin(min: String): NgSDateInput {
        this.min = min
        return this
    }

    public setMax(max: String): NgSDateInput {
        this.max = max
        return this
    }

    public setBlocked(blocked: String[]): NgSDateInput {
        this.blocked = blocked
        return this
    }

    public openDatepicker() {
        if (this.open) return
        this.open = true
        this.onInputFocus()
    }
}

export class NgSMultipleTextInput extends NgSInput {

    public internValue: String = ""

    constructor(name: String, id: String = "") {
        super(name, NgSInputType.MULTI_TEXT, id)
        this.setIcon("plus")
        this.onIconClick = this.add
    }

    add() {
        if (this.internValue != "" && !this.value.includes(this.internValue)) {
            this.value.push(this.internValue)
            this.internValue = ""
            this.onInput(this.value)
        }
    }

    remove(value: String) {
        if (this.value.includes(value)) {
            this.value.splice(this.value.indexOf(value), 1)
            this.onInput(this.value)
        }
    }

    enter(event: any) {
        if (this.internValue != "" && event.key == "Enter") {
            event.preventDefault()
            this.add()
        }
    }
}

export class NgSTextEditorInput extends NgSInput {
    public Editor

    constructor(name: String, id: String = "") {
        super(name, NgSInputType.EDITOR, id)
        this.Editor = customEditor
    }
}

export class CustomFileInput extends NgSInput {
    public buttonLabel: String = ""
    public buttonIcon: String = ""
    public fileUrl: String = ""

    constructor(label: String, id: String = "") {
        super(label, NgSInputType.CUSTOM_FILE, id)
        this.buttonIcon = "upload"
    }

    public setButtonLabel(label: String): CustomFileInput {
        this.buttonLabel = label
        return this
    }

    public setButtonIcon(icon: String): CustomFileInput {
        this.buttonIcon = icon
        return this
    }

    public setFileUrl(fileUrl: String): CustomFileInput {
        this.fileUrl = fileUrl
        return this
    }

    public onInput() { }

    public onRemove() { }
}