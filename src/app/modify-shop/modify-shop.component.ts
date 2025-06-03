import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../auth-service.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ModifyShopService } from './modify-shop.service';

@Component({
  selector: 'app-modify-shop',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './modify-shop.component.html',
  styleUrl: './modify-shop.component.css'
})
export class ModifyShopComponent {
    private authService = inject(AuthService);
    role = toSignal(this.authService.role$); 

    
}
