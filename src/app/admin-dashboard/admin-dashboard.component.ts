import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployesService } from '../employes/employes.service';
import { AuthService } from '../auth-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
 
  private authService = inject(AuthService);
  role = toSignal(this.authService.role$);
  
  
}
