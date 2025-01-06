import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  providers: [],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient) {}
  handleSubmit(e: Event) {
    e.preventDefault();
    const creds = {
      name: this.username,
      email: this.email,
      password: this.password
    };
    this.http.get<any>("https://jsonplaceholder.typicode.com/todos/1").subscribe(res => {
      console.log(res)
    })
  }

}
    
  //   this.apiService.postData('https://zayndev.pythonanywhere.com/submit_creds', creds).subscribe(
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

