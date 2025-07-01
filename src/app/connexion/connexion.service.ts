import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Interface dehors de la classe
//On créé une interface pour récuperer les données reçut
export interface LoginResponse {
  message: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  //On crée un constructeur avec httpClient
  constructor(private http: HttpClient) {}

  // ✅ Retour typé : Observable<LoginResponse>
  //On crée la requête
  envoyerConnexion(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:8000/api/login/', data, {
      withCredentials: true
    });
  }

 
}