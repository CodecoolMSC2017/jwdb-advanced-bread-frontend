import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login.guard';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ProfileComponent } from './profile/profile.component';
import { TablesComponent } from './tables/tables.component';
import { SeatsComponent } from './seats/seats.component';
import { OrdersComponent } from './orders/orders.component';

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
    path: 'restaurant/:restaurantId/employee' ,
    component: EmployeeComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'restaurant' ,
    component: RestaurantsComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'restaurant/:restaurantId/employee/:employeeId' ,
    component: EmployeeDetailComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'profile' ,
    component: ProfileComponent,
    canActivate: [LoginGuard] 
  
  },
  {
    path: 'restaurant/:restaurantId/table' ,
    component: TablesComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'restaurant/:restaurantId/table/:tableId/seat' ,
    component: SeatsComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'order/restaurant' ,
    component: OrdersComponent,
    canActivate: [LoginGuard] 
  }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
