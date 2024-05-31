import { Component } from '@angular/core';
import { BuildingService } from './building.service';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent {
  title = 'buy-or-rent';

  building: any;

  constructor(private buildingService: BuildingService) {}

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
      this.building = response;
    }, error => {
      console.error('API Error:', error);
      alert('Failed to fetch data.');
  });
  }
}
