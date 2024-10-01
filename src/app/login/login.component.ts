import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          this.authService.saveToken(response.accessToken);  // Assuming the response contains a JWT token
          this.router.navigate(['/dashboard']);        // Redirect to a secured page
        },
        error: (err) => {
          this.errorMessage = 'Invalid login credentials';
        }
      });
  }
}
