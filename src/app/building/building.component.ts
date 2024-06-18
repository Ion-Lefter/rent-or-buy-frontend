import { Component } from '@angular/core';
import { BuildingService } from './building.service';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
import { TestComponentComponent } from '../test-component/test-component.component';
import { Building } from './building';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent {
  title = 'buy-or-rent';
  building: any;
  //private test: TestComponentComponent;

  constructor(private buildingService: BuildingService,  private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.getBuildings();
  }

  getBuildings() {
    this.buildingService.getBuilding().subscribe(response => {
      this.building = response;
    });
  }

  getBuildingById(id: number){
    console.log('Button was clicked!');
    this.buildingService.getBuildingById(id).subscribe(response =>{
      this.sharedService.setBuilding(response);
      this.building = response;
      this.router.navigate(['/buildings', id]); // Navigate to the new route with the ID
      console.log(response);
    }, error => {
      console.error('API Error:', error);
      alert('Failed to fetch data.');
  });
  }


  getEditForm(id: number){
    console.log('Edit button was clicked!');
    this.buildingService.getBuildingById(id).subscribe(response =>{
      this.sharedService.setBuilding(response);
      this.building = response;
      this.router.navigate(['/buildings/edit/', id]); // Navigate to the new route with the ID
      console.log(response);
    }, error => {
      console.error('API Error:', error);
      alert('Failed to fetch data.');
  });
  }

  deleteBuildingById(id: number){
    console.log('Delete button was clicked!');
    this.buildingService.deleteBuildingById(id).subscribe(response =>{
      window.location.reload();
      console.log(response);
    }, error => {
      console.error('API Error:', error);
      alert('Failed to fetch data.');
  });
  }

  
}
