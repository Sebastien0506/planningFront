import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environment/environnement.prod';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {}
//On fait une requête au back pour récupérer le role de l'utilisateur connecter 
  fetchUserRole() {
    this.http.get<{ role: string }>(`${environment}/api/get_user_role/`, {
      withCredentials: true
    }).subscribe({//On récupère le role
      next: (res) => this.roleSubject.next(res.role),
      error: () => this.roleSubject.next(null)
    });
  }

  isLoggedIn(): boolean {
    return this.roleSubject.value !== null;
  }

  logout() : void{
    this.http.post('http://localhost:8000/logout/', {}, {
      withCredentials: true 
    }).subscribe({
      next: () => {
        this.roleSubject.next(null);
        window.location.reload();
      },
      error: (err) => {
        console.error("Erreur lors de la déconnexion", err);
      }
    });
  }

  getCSRFToken() {
    return this.http.get(`${environment.apiUrl}/csrf/`, { withCredentials: true})
  }
}