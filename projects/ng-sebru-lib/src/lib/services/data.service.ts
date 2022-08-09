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

	constructor(public value: any) {}

	public result(): Boolean {
		return true
	}
}

export class NgSTransformer {
	constructor(public value: any) {}

	public result(): any {
		return this.value
	}
}

export class IsIteratableCheck extends NgSCheck {
	public result(): Boolean {
		return Symbol.iterator in Object(this.value) && !(typeof this.value == 'string' || this.value instanceof String)
	}
}

export class Sha256Transformer extends NgSTransformer {
	public result(): any {
		var hashVal = 0
		if(this.value.length == 0) {
			return hashVal
		}
		for(let i = 0; i < this.value.length; i++) {
			let char = this.value.charCodeAt(i)
			hashVal = ((hashVal << 5) - hashVal) + char
			hashVal = hashVal & hashVal
		}
		return hashVal
	}
}