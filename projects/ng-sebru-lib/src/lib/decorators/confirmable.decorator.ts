import { NgSModalBuilder, NgSModalType, NgSModalButton } from "../../public-api";

export function Confirmable(body: String): Function {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			new NgSModalBuilder().setTitle("Sicher?").setType(NgSModalType.S)
				.addButton(new NgSModalButton("Abbrechen", false))
				.addButton(new NgSModalButton("Alles Klar", true, () => { return originalMethod.apply(this, args) }))
				.setText(body).open()
		};
		return descriptor;
	};
}