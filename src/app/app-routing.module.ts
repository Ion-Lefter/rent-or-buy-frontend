import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { BuildingComponent } from './building/building.component';


const routes: Routes = [
  {path: 'home', component: AppComponent, title: "Home"},
  {path: 'test', component: TestComponentComponent, title: "Test"},
  {path: 'buildings', component: BuildingComponent, title: "Buildings"}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
