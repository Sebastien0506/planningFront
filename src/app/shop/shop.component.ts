import { Component, inject } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ShopService } from './shop.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
    private authService = inject(AuthService);
    role = toSignal(this.authService.role$);

    constructor(private shopService: ShopService) {}
    
    name : string = "";

    validNameShop(name: string): string {
         if(typeof name !== "string") {
             return `Le champ ${name} doit être un chaine de caractère.`
         }
         for(let i = 0; i <= name.length; i++) {
             const code = name.charCodeAt(i);
             const ValidChar = 
             (code >= 65 && code <= 90) ||
             (code >= 97 && code <= 122) || 
             (code >= 48 && code <= 57) || 
             (code !== 32)
             if(!ValidChar) {
              return "Nom de la boutique invalide !"
             }
         }

      return "Ajout du magasin réussi."
    }

    envoyerRequest() {
      const estValid = this.validNameShop(this.name);
      if(!estValid){
        alert("Donnée invalide.");
        return;
      }

      const data ={
        shop_name: this.name
      };

      this.shopService.envoyerShop(data).subscribe({
        next: (res) => {
          alert(res.message);
        },
        error: (err) => {
          alert(err.message);
        }
      })

      
    }
}


