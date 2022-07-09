import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { NgSForm } from "../../public-api"
import { NgSAlertType } from "../models/Alert"
import { NgSError, NgSErrorType } from "../models/Error"
import { NgSPageService } from "./page.service"

@Injectable({
    providedIn: 'root'
})
export class NgSRestService {

	private defaultEndpoint: String = ""
	private authenticationTypes: AuthenticationType[] = []

    constructor(
        public httpClient: HttpClient,
		private pageService: NgSPageService
    ) {
		this.defaultEndpoint = "http://127.0.0.1:8000/api"
	}

	public setDefaultEndopint(endpoint: String) {
		this.defaultEndpoint = endpoint
	}

    public getDefaultEndpoint(): String {
        return this.defaultEndpoint
    }

	public addAuthenticationType(authenticationType: AuthenticationType) {
		this.authenticationTypes.push(authenticationType)
	}

	public getAuthenticationType(id: String) {
		return this.authenticationTypes.find(authenticationType => authenticationType.id == id)
	}

	public onError(error: any, restBuilder: RestBuilder): Boolean {
		var ngSError: NgSError = new NgSError(error.error)
		if(ngSError.level == NgSErrorType.UNKNOWN) {
			return false
		}

		if(ngSError.level == NgSErrorType.IGNORE) {
			return true
		} else if(ngSError.level == NgSErrorType.ALERT) {
			this.pageService.alert({
				id: ngSError.levelDescription,
				message: ngSError.error,
				type: NgSAlertType.DANGER
			})
			return true
		} else if(ngSError.level == NgSErrorType.INPUT && restBuilder.getInquirer() instanceof NgSForm) {
			restBuilder.getInquirer().showError(ngSError.error)
			return true
		} else if(ngSError.level == NgSErrorType.LOGOUT && restBuilder.getAuthenticationType()) {
			restBuilder.getAuthenticationType().onLogout()
			// TODO: Close Modals etc.
			return true
		}

		return false
	}

}

export class AuthenticationType {
	public id: String = ""

	constructor(id: String) {
		this.id = id
	}

	public onLogout() {}
}

export class BearerAuthenticationType extends AuthenticationType {
	public token: String = ""

	public setToken(token: String) {
		this.token = token
	}
}

export class RestBuilder {
	private url: String = ""
	private body: any = {}
	private endpoint: String = ""
	private params: String = ""
	private headers: HttpHeaders = new HttpHeaders()
	private handleErrorSelf: Boolean = false
	private authenticationType?: AuthenticationType
	private inquirer: any
	
	constructor(private restService: NgSRestService) {
		this.endpoint = restService.getDefaultEndpoint()
	}

	public setUrl(url: String): RestBuilder {
		this.url = url
		return this
	}

	public setBody(body: any): RestBuilder {
		this.body = body
		return this
	}


	public setEndpoint(endpoint: String): RestBuilder {
		this.endpoint = endpoint
		return this
	}

	public setHandleErrorSelf(handleErrorSelf: Boolean): RestBuilder {
		this.handleErrorSelf = handleErrorSelf
		return this
	}

	public setInquirer(inquirer: any): RestBuilder {
		this.inquirer = inquirer
		return this
	}

	public addParam(key: String, value: String): RestBuilder {
		if(this.params.length == 0) {
			this.params = "?" + key + "=" + value
		} else {
			this.params += "&" + key + "=" + value
		}
		return this
	}

	public addHeader(key: String, value: String): RestBuilder {
		this.headers = this.headers.append(key as string, value as string)
		return this
	}

	public addAuthorizationHeader(token: String): RestBuilder {
		this.addHeader("Authorization", "Bearer " + token)
		return this
	}

	public addAuthenticationType(authenticationTypeId: String): RestBuilder {
		this.authenticationType = this.restService.getAuthenticationType(authenticationTypeId)
		if(this.authenticationType instanceof BearerAuthenticationType) {
			this.addAuthorizationHeader(this.authenticationType.token)
		}
		return this
	}

	public getInquirer(): any {
		return this.inquirer
	}

	public getAuthenticationType(): AuthenticationType {
		return this.authenticationType!
	}

	public get(): Promise<any> {
		return new Promise((resolve,reject) => {
			this.restService.httpClient.get(this.endpoint as string + this.url + this.params, {headers: this.headers}).subscribe(response => {
				resolve(response)
			}, error => {
				if(this.handleErrorSelf || !this.restService.onError(error, this)) {
					reject(error)
				}
			});
		})
	}

	public post(): Promise<any> {
		return new Promise((resolve,reject) => {
			this.restService.httpClient.post(this.endpoint as string + this.url + this.params, this.body, {headers: this.headers}).subscribe(response => {
				resolve(response)
			}, error => {
				if(this.handleErrorSelf || !this.restService.onError(error, this)) {
					reject(error)
				}
			})
		})
	}

	public delete(): Promise<any> {
        return new Promise((resolve,reject) => {
            this.restService.httpClient.delete(this.endpoint as string + this.url + this.params, {headers:this.headers}).subscribe(response => {
                resolve(response)
            }, error => {
				if(this.handleErrorSelf || !this.restService.onError(error, this)) {
					reject(error)
				}
            })
        })
    }
}