import { Component } from '@angular/core';
import { BuildingService } from './building.service';
import { SharedService } from './shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestComponentComponent } from '../test-component/test-component.component';
import { Building } from './building';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';


@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent {
  title = 'buy-or-rent';
  building: any;
  username: string | null = '';
  pageTitle: string = '';
  favoritePosts: { [key: number]: boolean } = {};
  //isFavorited: boolean = false; // Initial state of the button (not favorited)

 
  //private test: TestComponentComponent;

  constructor(private buildingService: BuildingService,  private sharedService: SharedService, private router: Router, private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(urlSegment => {
      const path = urlSegment[0].path; // This gives you the first part of the route ('buildings' or 'myposts')
      if (path === 'buildings') {
        this.getBuildings();
        this.pageTitle = "Buildings";
      } else if (path === 'myposts') {
        this.getMyPosts();
        this.pageTitle = "My Posts";
      } else if (path === 'allposts') {
        this.getAllPosts();
        this.pageTitle = "All Posts"
      }
  });


    //this.getBuildings();
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

  getMyPosts(){
    const data = {
      username: this.authService.getUsername()  // Retrieve username from AuthService
    };
    this.buildingService.getMyPosts(data).subscribe(response => {
      this.building = response;
    });
  }

  getAllPosts(){
    const data = {
      username: this.authService.getUsername()  // Retrieve username from AuthService

    };
    this.buildingService.getAllPosts(data).subscribe(response => {
   

      this.building = response;

       // Loop through each building and populate favoritePosts
      //this.building.forEach((building: Building) => {
      //this.favoritePosts[building.id] = building.favorite || false; // Initialize favorite status
    //});
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

  deleteBuildingFromFavorites(buildingId: number, username: String){
    console.log('Delete button was clicked!');
    this.buildingService.deleteFromFavorites(buildingId, username).subscribe(response =>{
      window.location.reload();
      console.log(response);
    }, error => {
      console.error('API Error:', error);
      alert('Failed to fetch data.');
  });
  }


  reloadPage(){
    window.location.reload();
  }




  // toggleFavorite(postId: number) {
  //    //this.isFavorited = !this.isFavorited; // Toggle the state

  //       // If the post doesn't have a favorite state yet, initialize it to false
  //       if (this.favoritePosts[postId] === undefined) {
  //         this.favoritePosts[postId] = false;
  //       }
  //   // Toggle the favorite state of the post
  //   this.favoritePosts[postId] = !this.favoritePosts[postId];
  // }

  toggleFavorite(id: number) {
    // Assuming you have a way to update the favorite status in your data
    const post = this.building.find((b: { id: number; }) => b.id === id);
    if (post) {
      const data = {
        buildingId: id,
        username: this.authService.getUsername()  // Retrieve username from AuthService
      };
        post.favorite = !post.favorite; // Toggle the favorite status
        //this.favoritePosts[id] = post.favorite; // Update favoritePosts accordingly

        if(post.favorite){
        this.buildingService.addInfavorites(data).subscribe({
          next: () => {
              console.log('Favorite added successfully!');
          },
          error: (error) => {
              console.error('Error adding favorite:', error);
          }
      });
    }else{
      this.buildingService.deleteFromFavorites(id, this.authService.getUsername()!).subscribe({
        next: () => {
            console.log('Favorite deleted successfully!');
        },
        error: (error) => {
            console.error('Error deleting favorite:', error);
        }
    });
      console.log("Delete method")
    }
        // Here, you might want to call a service to update the favorite status in the backend
        //if(this.username)
        //this.buildingService.updateFavoriteStatus(post.id, post.favorite, this.username).subscribe(response => {});
    }
}

  isFavorited(postId: number): boolean {
    // Return true if the post is favorited, otherwise false
    return !!this.favoritePosts[postId] || false;
  }


  
}
