import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }
  getRole() {
    return this.http.get<{role: string }>("http://localhost:8000/api/get_user_role/", {
      withCredentials: true
    });
  }
}
