import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vacance  {
   id: number;
   username: string;
   last_name: string;
   start_day: string;
   end_day: string;
   status: string;
}
@Injectable({
  providedIn: 'root'
})
export class VacanceService {

  constructor(private http: HttpClient) { }

  getVacance():Observable<Vacance[]> {
    return this.http.get<Vacance[]>('http://localhost:8000/api/vacation_user', {
      withCredentials: true
    })
  }

  getVacanceAll():Observable<Vacance[]> {
    return this.http.get<Vacance[]>('http://localhost:8000/api/view_vacation/', {
      withCredentials: true
    })
  }
}
