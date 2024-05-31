import { Component, OnInit } from '@angular/core';
import { BuildingService } from './building/building.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'buy-or-rent';

  // building: any;

  // constructor(private buildingService: BuildingService) {}

  ngOnInit() {
    // this.getBuildings();
  }

  // getBuildings() {
  //   this.buildingService.getBuilding().subscribe(response => {
  //     this.building = response;
  //   });
  // }

  // getBuildingById(id: number){
  //   console.log('Button was clicked!');
  //   this.buildingService.getBuildingById(id).subscribe(response =>{
  //     this.building = response;
  //   }, error => {
  //     console.error('API Error:', error);
  //     alert('Failed to fetch data.');
  // });
  // }


}
