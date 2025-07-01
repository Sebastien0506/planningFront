import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NewpasswordService } from './newpassword.service';
import { validatePassword } from './newpassword.utils';

@Component({
  selector: 'app-newpassword',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './newpassword.component.html',
  styleUrl: './newpassword.component.css'
})
export class NewpasswordComponent {
  token: string = '';
  newPassword: string = '';

  constructor(private route: ActivatedRoute, private newPasswordService: NewpasswordService) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  

  resetPassword() {
    //On fait appel à la fonction pour valider les données.
    const valideMessage = validatePassword(this.newPassword)
    if(valideMessage !== true) {
      alert("Les données ne sont pas valide.");
    }
    //On initialise la variable data pour stocker les données que l'on veut envoyer.
    const data = {
      token : this.token,
      password: this.newPassword
    }
    
    //On initialise la requête pour envoyer les données.
    this.newPasswordService.sendNewPassword(data).subscribe({
      next: (ress) => {
        alert("Mot de passe sauvegarder avec succès.");
        console.log(ress);
      },
      error: (err) => {
        console.error("Erreur lors de la sauvegarde du mot de passe.", err);
      }
    })
    

  }
  
}
