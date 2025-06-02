import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ShopResponse {
  shop_name: any[] ;
}
@Injectable({
  providedIn: 'root'
})

export class ShopService {

  constructor(private http: HttpClient) { }
  envoyerShop(): Observable<ShopResponse[]>{
    return this.http.get<ShopResponse[]>('http://localhost:8000/api/view_shop/', {
      withCredentials: true
    });
  }
}
