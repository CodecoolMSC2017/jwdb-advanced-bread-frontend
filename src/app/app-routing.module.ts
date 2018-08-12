import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login.guard';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ProfileComponent } from './profile/profile.component';
import { TablesComponent } from './tables/tables.component';
import { SeatsComponent } from './seats/seats.component';
import { OrdersComponent } from './orders/orders.component';
import { WaiterTablesComponent } from './waiter-tables/waiter-tables.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { MenusComponent } from './menus/menus.component';
import { RegistrationComponent } from './registration/registration.component';
import { TakeOrdersComponent } from './take-orders/take-orders.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { SplitCheckComponent } from './split-check/split-check.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BarComponent } from './bar/bar.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/statistics',
    pathMatch: 'full', 
    canActivate: [LoginGuard]
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [LoginGuard] 
  },
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
  },
  {
    path: 'waiter/table' ,
    component: WaiterTablesComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'invoice/table/:tableId' ,
    component: InvoiceComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'changepassword',
    component: PasswordChangeComponent,
  },
  {
    path: 'menu/:restaurantId' ,
    component: MenusComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'orders/restaurant/:restaurantId/table/:tableId',
    component: TakeOrdersComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'order/table/:tableId/split',
    component: SplitCheckComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'bar',
    component: BarComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [LoginGuard]
  }


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
