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
  
}