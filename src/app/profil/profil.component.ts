import { Component, OnInit } from '@angular/core';
import { ProfilService, User } from './profil.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user!: User;
  constructor(private profilService: ProfilService) {}
  ngOnInit(): void {
    this.profilService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
      }
    });
  }

  //On créé une fonction avec des paramètres pour valider les données
  validInput(username: string, last_name: string, email: string) : string {
      //On créé une variable pour stocker tout les données.
      const  champs = [
        {nom: 'nom', valeur: username},
        {nom: 'prenom', valeur: last_name},
        {nom: 'email', valeur: email}
      ]
      //On fait une boucle pour vérifier tout les données.
      for(const champ of champs ) {
        if (typeof champ.valeur !== 'string') {
          return `Le champ ${champ.nom} doit être une chaine de caractère.`
        }
      }
      //On créé un fonction qui permet de vérifier les champ
      const isAlphaOnly = (str: string) => {
        //On créé une boucle for pour vérifier caractères par caractères.
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          const isLetter = (char >= 65 && char <= 90) || (char >= 97 && char <= 122);
          const isAccent = (char >= 192 && char <= 255);
          const isUnderscore = char === 95;
          const isHyphen = char === 45;
          const isSpace = char === 32;
          const isChiffre = (char >= 48 && char <= 57)
          //Retourne False si un caractère ne convient pas.
          if (!isLetter && !isAccent && !isUnderscore && !isHyphen && !isSpace && !isChiffre) {
            return false;
          }

        }

        return true;
      };
      //On vérifie tous les champs avec la fonction isAlphaOnly.
      if(!isAlphaOnly(username)) {
        return `Le champ ${username} contient des caractère invalide.`
      }
      if(!isAlphaOnly(last_name)) {
        return `Le champ ${last_name} contient des caractères invalide.`
      }
      if (!email.includes('@') || !email.includes('.')){
        return `Le champ ${email} est invalide.`
      }
    return 'Donnée valide.'

  }
//On créé la fonction pour envoyer les données
  modifierProfil() {
    //On créé la variable pour stocker les données.
    const data = {
      username : this.user.username,
      last_name: this.user.last_name,
      email : this.user.email,
    };
    this.profilService.sendData(data).subscribe({
      next: () => {
         alert('Profil modifier avec succès.')
      },
      error: () => {
        alert("Erreur lors de la modification.")
      }
    });
  }
}
