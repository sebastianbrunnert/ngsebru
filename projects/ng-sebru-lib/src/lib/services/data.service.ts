import { Injectable } from '@angular/core';
import * as shajs from 'sha.js'

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
		return shajs("sha256").update(this.value).digest("hex")
	}
}