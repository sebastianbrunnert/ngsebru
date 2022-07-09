import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgSDataService {

	public isIteratable(value: any): Boolean {
		return new IsIteratableCheck(value).result()
	}

}

export class NgSCheck {

	public value: any

	constructor(value: any) {
		this.value = value
	}

	public result(): Boolean {
		return true
	}
}

export class IsIteratableCheck extends NgSCheck {
	public result(): Boolean {
		return Symbol.iterator in Object(this.value) && !(typeof this.value == 'string' || this.value instanceof String)
	}
}