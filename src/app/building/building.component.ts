import { Component } from '@angular/core';
import { BuildingService } from './building.service';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
import { TestComponentComponent } from '../test-component/test-component.component';
import { Building } from './building';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent {
  title = 'buy-or-rent';
  building: any;
  username: string | null = '';
 
  //private test: TestComponentComponent;

  constructor(private buildingService: BuildingService,  private sharedService: SharedService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.getBuildings();
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
      setTimeout(() => {
      window.scrollTo(0, +scrollPosition);
      localStorage.removeItem('scrollPosition'); // Clean up after restoring
      }, 35);
      this.username= this.authService.getUsername();
    }
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
      localStorage.setItem('scrollPosition', window.scrollY.toString());
      this.router.navigate(['/dashboard/buildings', id]); // Navigate to the new route with the ID
      console.log(response);
    }, error => {
      console.error('API Error:', error);
      alert('Failed to fetch data.');
  });
  }


  getEditForm(id: number){
    console.log('Edit button was clicked!');
    localStorage.setItem('scrollPosition', window.scrollY.toString());
    this.buildingService.getBuildingById(id).subscribe(response =>{
      this.sharedService.setBuilding(response);
      this.building = response;
      this.router.navigate(['/dashboard/buildings/edit/', id]); // Navigate to the new route with the ID
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

  getMyPosts(){
    const data = {
      username: this.authService.getUsername()  // Retrieve username from AuthService
    };
    this.buildingService.getMyPosts(data).subscribe(response => {
      this.building = response;
    });
  }
  
}
