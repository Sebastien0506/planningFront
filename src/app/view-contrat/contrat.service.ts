import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//On définit l'interface pour l'object que l'on attend
export interface Contrat {
  id: number;
  contrat_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  

  constructor(private http: HttpClient) { }
//On créé la requête
  retrieveAllContrat():Observable<Contrat[]>{
    return this.http.get<Contrat[]>("http://localhost:8000/api/view_contrat/", {
      withCredentials: true
    });
  };
  onDetailContrat(contratId: number):Observable<Contrat>{
    return this.http.get<Contrat>('http://localhost:8000/api/')
  }
}
