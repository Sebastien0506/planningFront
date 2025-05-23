import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  //On injecte "AuthService" pour récupérer le role de l'utilisateur
  private authService = inject(AuthService);
  role = toSignal(this.authService.role$); // 🔥 transforme l'observable en signal

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
