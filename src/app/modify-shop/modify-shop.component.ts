import { Component, Inject, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../auth-service.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ModifyShopService } from './modify-shop.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    shopData: any;
    shopId!: number;
    
    constructor(private modifyService: ModifyShopService, @Inject(MAT_DIALOG_DATA) public data: {shopId: number}) {}
   //On initialise la variable shop_name a une variable vide
    shop_name: string = '';
    //Lors du chargement du module de dialog on envoi une requête au back pour demander les détail du magasin
    ngOnInit() {
      this.shopId = this.data.shopId;
      this.modifyService.onModifyShop(this.data.shopId).subscribe({
        next: (data) => {
          this.shopData = data;
          this.shop_name = data.shop_name;
          console.log("Donnée du magasin : ", data);
        },
        error(err) {
            console.log('Erreur lors de la récupération : ', err);
        },
      })
    }

    //On créé la fonction 
    validInput(): string {
      //On vérifie que le champ est bien de type string
        if(typeof this.shop_name !== "string"){
          return `Le champ ${this.shop_name} doit être une chaine de caractère.`;
        }
        //On vérifie que tous les caractères sont des caractères autoriser
        const isAlphaOnly = (str: string) => {
          for(let i = 0; i < str.length; i++){
            const char = str.charCodeAt(i);
            const isNumber = (char >= 48 && char <= 57);
            const isLetter = (char >= 65 && char <= 90) || (char >= 97 && char <= 122);
            const isAccent = (char >= 192 && char <= 255);
            const isSpace = char === 32;
    
            if(!isAccent && !isLetter && !isNumber && !isSpace) {
              return `Le champ ${this.shop_name} contient des caractères invalide.`;
            }
          }
          return true
        }
        if (!isAlphaOnly(this.shop_name)){
          return `Le champ ${this.shop_name} contient des caractère invalide.`;
        }

     return "Données valide.";
    }
    viewData(){
      console.log(this.shop_name);
    }
    sendRequest() {
      const estValid = this.validInput();
      if (estValid !== "Données valide.") {
        alert(estValid);
        return;
      }

      const data = {
        shop_name: this.shop_name,
      };

      this.modifyService.sendRequestData(this.shopId, data).subscribe({
        next: () => {
          alert("Magasin mis à jour.");
        },
        error: (err) => {
          console.log("Erreur lors de la mise à jour.", err);
        }
      });
    }
}
