import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { BuildingComponent } from './building/building.component';
import { BuildingFormComponent } from './building-form/building-form.component';


const routes: Routes = [
  {path: 'home', component: AppComponent, title: "Home"},
  {path: 'buildings/:id', component: TestComponentComponent, title: "TestOK"},
  {path: 'buildings', component: BuildingComponent, title: "Buildings"},
  {path: 'add', component: BuildingFormComponent, title: "Add Building"},
  {path: 'buildings/edit/:id', component: BuildingFormComponent, title: "Test edit button"}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
