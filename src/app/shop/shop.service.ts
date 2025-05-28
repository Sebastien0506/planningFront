import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AddShopResponse {
  message: string;
}
@Injectable({
  providedIn: 'root'
})

export class ShopService {

  constructor(private http: HttpClient) { }
  envoyerShop(data: any): Observable<AddShopResponse>{
    return this.http.post<AddShopResponse>('http://localhost:8000/api/shop/', data, {
      withCredentials: true
    });
  }
}
