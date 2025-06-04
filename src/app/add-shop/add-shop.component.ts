import { Component, inject } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { AddShopService } from './add-shop.service';
@Component({
  selector: 'app-add-shop',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, CommonModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './add-shop.component.html',
  styleUrl: './add-shop.component.css'
})
export class AddShopComponent {
  private authServices = inject(AuthService);
  role = toSignal(this.authServices.role$);
   
  shop_name: string = '';
constructor (private addShop: AddShopService){}
  //On vérifie si les données sont valide
  validInput(): string {
    //On vérifie si le champ est bien de type string
    if(typeof this.shop_name !== 'string'){
      return `Le champ ${this.shop_name} doit être une chaine de caractère.`
    };

    //On vérifie si tous les caractères sont des caractères autoriser.
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
      return true;
    }
    if(!isAlphaOnly(this.shop_name)){
      return `Le champ ${this.shop_name} contient des caractères invalide.`;
    }
    return "Donnée valide.";
  }
  
  sendRequest(){
    const validateMessage = this.validInput();
    if( validateMessage !== "Donnée valide."){
      alert(validateMessage);
      return;
    }

    const data = {
      shop_name: this.shop_name
    }

    this.addShop.sendRequestData(data).subscribe({
      next: () => {
        alert('Magasin ajouté avec succès');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
