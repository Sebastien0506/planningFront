import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  last_name: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) { }
  getUser():Observable<User> {
    return this.http.get<User>('http://localhost:8000/api/profil_user/', {
      withCredentials: true 
    });
  }
}
