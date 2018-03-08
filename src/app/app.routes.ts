import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/service.index';


const routes: Routes = [
    { path: 'login', component: LoginComponent, data: { titulo: 'Login' } },
    { path: 'register', component: RegisterComponent, data: { titulo: 'Register' } },
    {
        path:'',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        //Para el lazy load usamos load children: Para que los componentes de Pages no se carguen siempre sino solamente cuando los abrimos
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );