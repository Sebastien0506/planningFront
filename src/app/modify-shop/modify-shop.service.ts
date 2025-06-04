import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//on créé l'interface pour récupérer les données que l'on souhaite.
export interface Shop{
  id: number;
  shop_name: string;
}

@Injectable({
  providedIn: 'root'
})


export class ModifyShopService {

  constructor(private http: HttpClient) { }
 // On crée la requête pour récupérer les données du magasin sélectionné.
  
 onModifyShop(shopId: number): Observable<Shop>{
  return this.http.get<Shop>(`http://localhost:8000/api/view_one_shop/${shopId}`, {
    withCredentials: true
  });
}
sendRequestData(shopId:number, data: any) {
  return this.http.put(`http://localhost:8000/api/shop_update/${shopId}/`, data, {
    withCredentials: true
  });
}
}