import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private http: HttpClient) { }

  sendRequestReset(data: any){
    return this.http.post('http://localhost:8000/api/password_reset/',data, {
      withCredentials: true
    });
  }
}
