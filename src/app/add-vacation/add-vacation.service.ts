import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AddVacationService {

  constructor(private http: HttpClient) { }

  sendVacation(data: any) {
   return this.http.post('http://localhost:8000/api/', data, {
      withCredentials: true
    });

  }
}
