import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Planning {
  id: number;
  date: string;
  start_hour: string | null;
  end_hour: string | null;
  label: string;
  created_at: string;
  user: number;
}
@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(private http: HttpClient) { }

  retrievePlanning(): Observable<Planning[]> {
    return this.http.get<Planning[]>('http://localhost:8000/api/retrieve_planning/', {
      withCredentials: true
    });
  }

  getConnectedUser() {
    return this.http.get<any>('http://localhost:8000/api/profil_user/', { withCredentials: true });
  }
  
  getAllUsers() {
    return this.http.get<any[]>('http://localhost:8000/api/view_employes/', { withCredentials: true });
  }
}

