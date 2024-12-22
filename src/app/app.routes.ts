import { Routes } from '@angular/router';
import { MainComponent } from './dirs/main/main.component';
import { LoginComponent } from './dirs/login/login.component';

export const routes: Routes = [
    { path: 'main', component: MainComponent },
    { path: '', component: LoginComponent }
];
