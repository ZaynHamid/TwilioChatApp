import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postLoginCreds(url: string, data: any) {
    return this.http.post<any>(url, data)
  }
}
