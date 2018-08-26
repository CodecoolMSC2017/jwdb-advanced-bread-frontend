import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
import { RegistrationComponent } from './registration/registration.component';
import { MenusComponent } from './menus/menus.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { TakeOrdersComponent } from './take-orders/take-orders.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { SplitCheckComponent } from './split-check/split-check.component';
import { BarComponent } from './bar/bar.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { ToasterService } from './toaster.service';


@NgModule({
  declarations: [
    AppComponent,
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
    InvoiceComponent,
    RegistrationComponent,
    InvoiceComponent,
    MenusComponent,
    IngredientsComponent,
    TakeOrdersComponent,
    ForgotPasswordComponent,
    PasswordChangeComponent,
    SplitCheckComponent,
    BarComponent,
    StatisticsComponent,
    MyOrdersComponent,
    KitchenComponent,
    MenuItemsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [
    httpInterceptorProviders,
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
