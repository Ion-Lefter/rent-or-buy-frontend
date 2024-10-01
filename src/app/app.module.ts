import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TestComponentComponent } from './test-component/test-component.component';
import { BuildingComponent } from './building/building.component';
import { BuildingFormComponent } from './building-form/building-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    BuildingComponent,
    BuildingFormComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    AuthGuard 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
