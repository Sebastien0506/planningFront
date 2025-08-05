import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private http: HttpClient) { }

  sendRequest(){
    return this.http.get('http://localhost:8000/api/generate_calendar', {
      withCredentials: true
    });
  }
}
