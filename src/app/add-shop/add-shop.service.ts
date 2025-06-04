import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddShopService {

  constructor(private http: HttpClient) { }

  sendRequestData(data: any){
      return this.http.post('http://localhost:8000/api/shop/', data, {
        withCredentials: true
      });
  }
}
