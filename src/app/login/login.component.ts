import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = ""
  password: string = ""
  token: string = ""
  constructor(private apiService: ApiService, private router: Router){}
  handleSubmit(e: Event) {
    e.preventDefault();  
    const creds = {
      email: this.email,
      password: this.password
    };
  
    this.apiService.postLoginCreds("https://zayndev.pythonanywhere.com/login", creds).subscribe(
      res => {
        localStorage.setItem("token", res.token)
        this.router.navigate(["dashboard"])
      },
      error => {
        console.log('Login error:', error);
      }
    );
  }
  

}
