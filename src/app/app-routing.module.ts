import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { BuildingComponent } from './building/building.component';
import { BuildingFormComponent } from './building-form/building-form.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: 'home', component: AppComponent, title: "Home"},
  {path: 'login', component: LoginComponent, title: "Login Page"},
  {path: 'register', component: RegisterComponent, title: "Register Page"},

  {
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard],
    children: [
      
        // { path: '', component: DashboardComponent },  // Default dashboard route
        {path: 'buildings/:id', component: TestComponentComponent, title: "TestOK"},
        {path: 'buildings', component: BuildingComponent, title: "Buildings"},
        {path: 'myposts', component: BuildingComponent, title: "My Posts"},
        {path: 'allposts', component: BuildingComponent, title: "All Posts"},
        {path: 'add', component: BuildingFormComponent, title: "Add Building"},
        {path: 'buildings/edit/:id', component: BuildingFormComponent, title: "Test edit button"},
        {path: 'login', component: LoginComponent, title: "Login Page"},
        {path: 'logout', component: LogoutComponent, title: "Logout Page", canActivate: [AuthGuard]}

      
    ]
  },
  // { path: '**', redirectTo: '' } 
  // {path: 'buildings/:id', component: TestComponentComponent, title: "TestOK", canActivate: [AuthGuard]},
  // {path: 'buildings', component: BuildingComponent, title: "Buildings", canActivate: [AuthGuard]},
  // {path: 'add', component: BuildingFormComponent, title: "Add Building", canActivate: [AuthGuard]},
  // {path: 'buildings/edit/:id', component: BuildingFormComponent, title: "Test edit button", canActivate: [AuthGuard]},
  // {path: 'login', component: LoginComponent, title: "Login Page"},
  // {path: 'logout', component: LogoutComponent, title: "Logout Page", canActivate: [AuthGuard]},

  
]

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', // or 'top'
  anchorScrolling: 'enabled',
  // other options
};

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
