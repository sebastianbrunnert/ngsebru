import { Injector, ViewContainerRef } from "@angular/core"

let NgSInjector: Injector
let NgSViewContainerRef: ViewContainerRef

function SetNgSViewContainerRef(viewContainerRef: ViewContainerRef) {
    NgSViewContainerRef = viewContainerRef
}

function SetNgSInjector(injector: Injector) {
    NgSInjector = injector
}

export { NgSInjector, NgSViewContainerRef, SetNgSViewContainerRef, SetNgSInjector }
