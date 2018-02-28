import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent, data: { titulo: 'Login' } },
    { path: 'register', component: RegisterComponent, data: { titulo: 'Register' } },
    { path: '**', component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );