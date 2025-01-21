import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    private apiService: ApiService,
    private router: Router
  ){}

  accessRoute() {
    const token: string = localStorage.getItem("token") || ''

    this.apiService.accessRoute("https://Zayndev.pythonanywhere.com/protected", token).subscribe(res => {console.log(res)})
  }

  logout() {
    localStorage.clear()
    this.router.navigate(["/"])
  }

}
