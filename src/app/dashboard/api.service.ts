import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  accessRoute(url: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this.http.get(url, {headers})
  }
}
