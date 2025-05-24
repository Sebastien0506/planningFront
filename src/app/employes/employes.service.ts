import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employe {
  id: number;
  username: string;
  last_name: string;
  email: string;
}
export interface ViewEmployes {
  employes: Employe[]
}
@Injectable({
  providedIn: 'root'
})
export class EmployesService {

  constructor(private http: HttpClient) { }
  envoyerRequest() : Observable<Employe[]> {
    return this.http.get<Employe[]>('http://localhost:8000/api/view_employes/', {
      withCredentials: true
    })
  }
}
