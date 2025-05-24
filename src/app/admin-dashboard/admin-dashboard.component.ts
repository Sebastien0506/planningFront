import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployesService } from '../employes/employes.service';
import { AuthService } from '../auth-service.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
 
  private authService = inject(AuthService);
  role = toSignal(this.authService.role$);
  
  
}
