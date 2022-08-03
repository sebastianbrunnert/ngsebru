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

	public getPromise(): Promise<Language> {
		if(this.language.id != "") {
			return Promise.resolve(this.language)
		} else if(this.promise == null) {
			this.promise = new Promise((resolve) => {
				this.getLanguages().then((languages:Language[]) => {
					this.languages = languages
					this.languages.forEach((language:Language) => {
						if(localStorage.getItem("language") == language.id || localStorage.getItem("language") == null) {
							this.getLanguage(language.id).then((jsonLanguage:Language) => {
								const entries = new Map()
								Object.keys(jsonLanguage.entries).forEach((key:any) => {
									entries.set(key, jsonLanguage.entries[key])
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

	public load() {
		this.getPromise()
	}

}

export class Language {

	constructor(
		public title: String,
		public id: String,
		public entries: Map<String, String> = new Map<String, String>()
	) {}

	public getTranslation(key: String) {
		return this.entries.get(key) || key
	}

}