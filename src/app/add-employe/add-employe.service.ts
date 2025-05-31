import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contrat {
  id: number;
  name_contrat: string;
}

export interface Magasin {
  id: number;
  shop_name: string;
  checked?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AddEmployeService {

  constructor(private http: HttpClient) { }

  retrieveAllContrat(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>('http://localhost:8000/api/view_contrat/', {
      withCredentials: true
    })
  }

  retrieveAllShop(): Observable<Magasin[]> {
    return this.http.get<Magasin[]>('http://localhost:8000/api/view_shop/', {
      withCredentials: true
    })
  }
  addEmploye(data: any) {
    return this.http.post('http://localhost:8000/api/add_employer/', data, {
      withCredentials: true
    })
  }
}
