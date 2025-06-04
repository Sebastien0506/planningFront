import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//On crée une interface qui permet de recevoir les données des magasins
export interface ShopResponse {
  id: number;
  shop_name: any[] ;
}
@Injectable({
  providedIn: 'root'
})

export class ShopService {

  constructor(private http: HttpClient) { }
  //on créé un fonction qui permet d'envoyer une requete qui permet de récupérer les données des magasins.
  envoyerShop(): Observable<ShopResponse[]>{
    return this.http.get<ShopResponse[]>('http://localhost:8000/api/view_shop/', {
      withCredentials: true
    });
  }
  //On créé la fonction qui permet l'envoie de la requête et on lui donne l'id du magasin.
  deleteShop(shopId: number): Observable<any>{
    return this.http.delete(`http://localhost:8000/api/shop_delete/${shopId}/`,{
      withCredentials: true
    } )
  }

  
}
