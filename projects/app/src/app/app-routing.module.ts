import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "super-admin",
		loadChildren: () => import("./pages/super-admin/super-admin.module").then(m => m.SuperAdminModule)
	},
	{
		path: "",
		loadChildren: () => import("./pages/user/user.module").then(m => m.UserModule)
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })],
	exports: [RouterModule]
})
export class AppRoutingModule { }