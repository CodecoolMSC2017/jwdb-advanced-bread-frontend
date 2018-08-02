import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { httpInterceptorProviders } from './http-interceptors';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeeComponent }from './employee/employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ProfileComponent } from './profile/profile.component';
import { RestaurantDeatilsComponent } from './restaurant-deatils/restaurant-deatils.component';
import { ItemsComponent } from './items/items.component';
import { TablesComponent } from './tables/tables.component';
import { SeatsComponent } from './seats/seats.component';
import { OrdersComponent } from './orders/orders.component';
import { WaiterTablesComponent } from './waiter-tables/waiter-tables.component';
import { InvoiceComponent } from './invoice/invoice.component';
<<<<<<< HEAD
import { RegistrationComponent } from './registration/registration.component';
=======
import { MenusComponent } from './menus/menus.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
>>>>>>> 032dfe1c3b15dcc5bf88d386315a2c1212739504

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    EmployeeComponent,
    SidebarComponent,
    EmployeeDetailComponent,
    RestaurantsComponent,
    ProfileComponent,
    RestaurantDeatilsComponent,
    ItemsComponent,
    TablesComponent,
    SeatsComponent,
    OrdersComponent,
    WaiterTablesComponent,
<<<<<<< HEAD
    InvoiceComponent
    RegistrationComponent
=======
    InvoiceComponent,
    MenusComponent,
    IngredientsComponent
>>>>>>> 032dfe1c3b15dcc5bf88d386315a2c1212739504
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
