import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchUserRole() {
    this.http.get<{ role: string }>('http://localhost:8000/api/get_user_role/', {
      withCredentials: true
    }).subscribe({
      next: (res) => this.roleSubject.next(res.role),
      error: () => this.roleSubject.next(null)
    });
  }

  isLoggedIn(): boolean {
    return this.roleSubject.value !== null;
  }

  logout() {
    this.roleSubject.next(null);
  }
}