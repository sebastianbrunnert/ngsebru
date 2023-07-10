import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NgSLangService {

    public language: Language = new Language("Default Language", "")
    public languages: Language[] = []

    public promise?: Promise<Language>

    public getLanguages(): Promise<Language[]> {
        return Promise.resolve([])
    }

    public getLanguage(id: String): Promise<Language> {
        return Promise.resolve(new Language("Default Language", ""))
    }

    public load(): Promise<Language> {
        if (this.language.id != "") {
            return Promise.resolve(this.language)
        } else if (this.promise == null) {
            this.promise = new Promise((resolve) => {
                this.getLanguages().then((languages: Language[]) => {
                    this.languages = languages
                    this.languages.forEach((language: Language) => {
                        if (localStorage.getItem("language") == language.id || localStorage.getItem("language") == null) {
                            this.getLanguage(language.id).then((jsonLanguage: Language) => {
                                const entries = new Map()
                                Object.keys(jsonLanguage.entries).forEach((key: any) => {
                                    entries.set(key, jsonLanguage.entries.get(key))
                                })
                                this.language = new Language(jsonLanguage.title, jsonLanguage.id, entries)
                                resolve(this.language)
                            })
                        }
                    })
                })
            })
            return this.promise
        } else {
            return this.promise
        }
    }

    public getTranslation(key: String) {
        return this.language.getTranslation(key)
    }

    public loadGermanDefaults() {
        this.load()

        const entries = new Map()
        entries.set("INPUT_DEFAULT_PLACEHOLDER", "Eingeben...")
        entries.set("FORM_DEFAULT_SEND", "Absenden")
        entries.set("INPUT_REQUIRED", "wird benötigt")
        entries.set("INPUT_INVALID", "ist ungültig")
        entries.set("INPUT_DEFAULT_CHOOSE", "Auswählen...")
        entries.set("INPUT_DEFAULT_OPTIONAL", "optional")
        entries.set("JANUARY", "Januar")
        entries.set("FEBRUARY", "Februar")
        entries.set("MARCH", "März")
        entries.set("APRIL", "April")
        entries.set("MAY", "Mai")
        entries.set("JUNE", "Juni")
        entries.set("JULY", "Juli")
        entries.set("AUGUST", "August")
        entries.set("SEPTEMBER", "September")
        entries.set("OCTOBER", "Oktober")
        entries.set("NOVEMBER", "November")
        entries.set("DECEMBER", "Dezember")
        entries.set("TODAY", "Heute")
        entries.set("TOMORROW", "Morgen")
        entries.set("MONDAY", "Montag")
        entries.set("TUESDAY", "Dienstag")
        entries.set("WEDNESDAY", "Mittwoch")
        entries.set("THURSDAY", "Donnerstag")
        entries.set("FRIDAY", "Freitag")
        entries.set("SATURDAY", "Samstag")
        entries.set("SUNDAY", "Sonntag")
        entries.set("MONDAY_ABBR", "Mo")
        entries.set("TUESDAY_ABBR", "Di")
        entries.set("WEDNESDAY_ABBR", "Mi")
        entries.set("THURSDAY_ABBR", "Do")
        entries.set("FRIDAY_ABBR", "Fr")
        entries.set("SATURDAY_ABBR", "Sa")
        entries.set("SUNDAY_ABBR", "So")
        entries.set("SECONDS", "Sekunde(n)")
        entries.set("MINUTES", "Minute(n)")
        entries.set("HOURS", "Stunde(n)")

        this.language = new Language("Deutsch", "german_default", entries);
    }

}

export class Language {

    constructor(
        public title: String,
        public id: String,
        public entries: Map<String, String> = new Map<String, String>()
    ) { }

    public getTranslation(key: String) {
        return this.entries.get(key) || key
    }

}