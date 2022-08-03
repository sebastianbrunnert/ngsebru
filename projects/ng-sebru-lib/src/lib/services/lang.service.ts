import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgSLangService {

	public language: Language = new Language("Unknown language","")
	public languages: Language[] = []

	public addLanguage(language: Language) {
		this.languages.push(language)
		if(localStorage.getItem("language") == language.id) {
			this.chooseLanguage(language)
		} else if(localStorage.getItem("language") == null && this.languages.length == 1) {
			this.chooseLanguage(language)
		}
	}

	public chooseLanguage(language: Language) {
		this.language = language
		this.language.load()
	}

	public setLanguage(language: Language) {
		this.chooseLanguage(language)
		localStorage.setItem("language", language.id as string)
	}

	public getTranslation(key: String): String {
		return this.language.getEntry(key) || key
	}

	public getPromise(): Promise<Map<String,String>> {
		return this.language.promise!
	}
}

export class Language {
	public entries: Map<String, String> = new Map<String, String>()
	public promise?: Promise<Map<String,String>>

	constructor(
		public title: String,
		public id: String
	) {}

	public load() {
		this.promise = new Promise((resolve) => {
			this.onLoad().then(() => {
				resolve(this.entries)
			})
		})
	}

	public onLoad(): Promise<void> {
		return new Promise(resolve => resolve)
	}

	public getEntry(key: String): String {
		if(this.entries && this.entries.has(key)) {
			return this.entries.get(key) || key
		}
		return key
	}

	public addEntry(key: String, value: String) {
		this.entries = this.entries.set(key, value)
	}
}