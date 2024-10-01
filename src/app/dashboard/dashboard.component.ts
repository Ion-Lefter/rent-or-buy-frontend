import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'buy-or-rent-dashboard';


  constructor(private authService: AuthService,  private router: Router, private layoutService: LayoutService) {}
  ngOnInit(){
        // Hide the main nav when on the dashboard
        this.layoutService.setNavBarVisibility(false);
  }

  ngOnDestroy() {
    // Show the main nav when leaving the dashboard
    this.layoutService.setNavBarVisibility(true);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  refreshpage(){
    console.log("button was clicked!")
  }


}
