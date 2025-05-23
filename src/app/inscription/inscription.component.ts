import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InscriptionService } from '../inscription.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  
  username: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";

  constructor(private inscriptionService: InscriptionService, private authService: AuthService, private router: Router){}

  validInscription(username: string, lastname: string, email: string, password: string): string {
    //On crée une variable champs
    const champs = [
      { nom: 'nom', valeur: username },
      { nom: 'prénom', valeur: lastname },
      { nom: 'email', valeur: email },
      { nom: 'mot de passe', valeur: password },
    ];
  //On vérifie si tous les chanps sont de type string
    for (const champ of champs) {
      if (typeof champ.valeur !== 'string') {
        return `❌ Le champ '${champ.nom}' doit être une chaîne de caractères.`;
      }
    }
    //On vérifie si les caractères sont des caractères autorisé
    const isAlphaOnly = (str: string) => {
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        const isLetter = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
        const isHyphen = code === 45;
        if (!isLetter && !isHyphen) return false;
      }
      return true;
    };
  
    if (!isAlphaOnly(username)) {
      return "❌ Le champ 'nom' est invalide.";
    }
  
    if (!isAlphaOnly(lastname)) {
      return "❌ Le champ 'prénom' est invalide.";
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      return '❌ Email invalide : il doit contenir @ et .';
    }
  //On vérifie que l'email contient que des caractères autorisé
    for (let i = 0; i < email.length; i++) {
      const code = email.charCodeAt(i);
      const isValidChar =
        (code >= 48 && code <= 57) || // chiffres
        (code >= 65 && code <= 90) || // lettres majuscules
        (code >= 97 && code <= 122) || // lettres minuscules
        code === 95 || code === 64 || code === 46; // _, @, .
      if (!isValidChar) {
        return `❌ Email invalide : caractère non autorisé → ${email[i]}`;
      }
    }
    //On initialise les variales 'contientChiffre' et 'contientMajuscule' à false
    let contientChiffre = false;
    let contientMajuscule = false;
    let contientCaractereSpecial = false;

    //On définit les caractères spéciaux autorisé pour le mot de passe
    const specialChars = [35, 36, 37, 64]; // #, $, %, @

  //On vérifie que le mot de passe contient bien une majuscule, un chiffre et un caractères spéciale
    for (let i = 0; i < password.length; i++) {
      const code = password.charCodeAt(i);
      if (code >= 65 && code <= 90) contientMajuscule = true;
      if (code >= 48 && code <= 57) contientChiffre = true;
      if (specialChars.includes(code)) contientCaractereSpecial = true;
      //On vérifie que le mot de passe contient que des caractères autorisé
      const isAllowedChar =
        (code >= 48 && code <= 57) || // chiffres
        (code >= 65 && code <= 90) || // majuscules
        (code >= 97 && code <= 122) || // minuscules
        specialChars.includes(code);
  
      if (!isAllowedChar) {
        return `❌ Mot de passe invalide : caractère non autorisé → ${password[i]}`;
      }
    }
  
    if (!contientChiffre || !contientMajuscule || !contientCaractereSpecial) {
      return "❌ Mot de passe invalide : il doit contenir au moins une majuscule, un chiffre et un caractère spécial (#, $, %, @).";
    }
  
    return "✅ Inscription valide.";
  }
  // 📦 Méthode pour afficher les valeurs si besoin
  afficherValeurs(): void {
    console.log('Username : ', this.username);
    console.log('Lastname : ', this.lastname);
    console.log('Email :', this.email);
    console.log('Password :', this.password);
  }
  //On crée la fonction qui permet l'envoie des données au back
  envoyer() {
    //On vérifie si les données sont valide
    const estValide = this.validInscription(this.username, this.lastname, this.email, this.password);
    if(!estValide) {
      console.log("Données invalides, requête bloquée.");
      return;
    }
    //On stock les données dans la variable data
    const data = {
      username: this.username,
      last_name: this.lastname,
      email: this.email,
      password: this.password
    };
    //On envoie les données
   this.inscriptionService.envoyerInscription(data).subscribe({
    next: (res) => {
      alert(res.message);

      this.authService.fetchUserRole();
      //On redirige l'utilisteur
      setTimeout(() => this.router.navigate(['/']), 300);
      

    },
    error: (err) => {
      console.error('Erreur : ', err);
      alert(err.message)
    }
    
   });
  }
}

