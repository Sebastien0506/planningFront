import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Employe {
  id: number;
  username: string;
  last_name: string;
  working_day: [
    {
      working_day: string;
      start_day: Date;
      end_day: Date;
    }
  ];
  shops: [
    {
      name: string;
    }
  ]

}
export interface detailEmploye {
  employe: Employe[]
}


@Injectable({
  providedIn: 'root'
})
export class DetailEmployerService {

  constructor(private http: HttpClient) { }
  // On récupère les données de l'employé
  detailEmploye(userId: number): Observable<Employe[]> {
    return this.http.get<Employe[]>(`http://localhost:8000/api/detail_employe/${userId}`, {
      withCredentials: true
    });
  }
  

  //On envoie les donnée
  sendRequestData(userId: number, data: any): Observable<Employe[]> {
    return this.http.patch<Employe[]>(`http://localhost:8000/api/up_employer/${userId}/`, data, {
      withCredentials: true
    });
  }
  
}
