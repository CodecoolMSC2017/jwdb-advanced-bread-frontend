import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login.guard';
import { RegisterComponent } from './register/register.component';
import { EmployeeComponent } from './employee/employee.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/dashboard', 
    pathMatch: 'full' },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [LoginGuard] },
  { 
    path: 'login', 
    component: LoginComponent },
  { 
    path: 'register', 
    component: RegisterComponent },
  {
    path: 'employee' ,
    component: EmployeeComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'restaurants' ,
    component: RestaurantsComponent,
    canActivate: [LoginGuard] 
  }


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
