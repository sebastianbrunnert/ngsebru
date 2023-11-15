import { NgSModal, NgSModalButton } from "../components/modal/modal.component";

export function Confirmable(body: String, button: String = "CONFIRMABLE_SUBMIT"): Function {
    return (target: Function, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const modal = new NgSModal().setTitle("CONFIRMABLE_HEADLINE")
                .addButton(new NgSModalButton(button, "red-500", "red-700", () => { originalMethod.apply(this, args); modal.close() }))
                .setText(body)
            modal.open();
        };
        return descriptor;
    }
}