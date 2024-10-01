import { Component, OnInit } from '@angular/core';
import { BuildingService } from './building/building.service';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'buy-or-rent';
  showNavBar: boolean = true;

  // building: any;

  constructor(private authService: AuthService, private router: Router, private layoutService: LayoutService) { }

  ngOnInit() {
    // this.layoutService.showNavBar$.subscribe(isVisible => {
    //   this.showNavBar = isVisible;
    // });
        // Listen for route changes to control the visibility of the navbar
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            // Check if the current route is part of the authenticated section
            this.showNavBar = !(event.url.includes('/dashboard') 
            || event.url.includes('/add') 
            || event.url.includes('/buildings'));
          }
        });
  }

  refreshpage(){
    console.log("button was clicked!")
  }

  get isLoggedIn(): boolean {
    // Check if the user is authenticated to hide the login nav
    return this.authService.isAuthenticated() && this.router.url === '/dashboard';
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
