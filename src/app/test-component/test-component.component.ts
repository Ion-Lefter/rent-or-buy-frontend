import { Component, OnInit } from '@angular/core';
import { SharedService } from '../building/shared.service';
import { ActivatedRoute } from '@angular/router';
import { BuildingService } from '../building/building.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit{
  id: any;
  building: any;


  constructor(private sharedService: SharedService, private route: ActivatedRoute, private buildingservice: BuildingService) {  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id'); // Get the ID from the URL
      this.loadBuilding(this.id); // Fetch or get the building data
    });
    

    // this.sharedService.currentBuilding.subscribe(
    //   data => {
    //     this.building = data;
    //   }
    // );
  }

  loadBuilding(id: number) {
    if (!this.building || this.building.id !== id) {
      this.buildingservice.getBuildingById(id).subscribe(
        data => {
          this.building = data; // Fetch data if not already available
        },
        error => {
          console.error('Error fetching building data', error);
        }
      );
    }
  }
}


