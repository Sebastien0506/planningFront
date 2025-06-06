import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InscriptionResponse {
  message: string;
}
@Injectable({
  providedIn: 'root'
})

export class InscriptionService {

  constructor(private http: HttpClient) { }

  envoyerInscription(data: any) : Observable<InscriptionResponse> {
    return this.http.post<InscriptionResponse>('http://localhost:8000/api/add_admin/', data, {
      withCredentials: true
    });
  }
}
