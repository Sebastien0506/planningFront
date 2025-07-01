import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewpasswordService {

  constructor(private http: HttpClient) { }

  sendNewPassword(data: any){
    return this.http.post('http://localhost:8000/api/password_reset/confirm/', data, {
      withCredentials: true
    })
  }
}
