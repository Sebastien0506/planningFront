import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environnement.prod';

export interface InscriptionResponse {
  message: string;
}
@Injectable({
  providedIn: 'root'
})

export class InscriptionService {

  constructor(private http: HttpClient) { }

  envoyerInscription(data: any) : Observable<InscriptionResponse> {
    return this.http.post<InscriptionResponse>(`${environment.apiUrl}/api/add_admin/`, data, {
      withCredentials: true
    });
  }
}
