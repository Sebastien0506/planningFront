import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  validInscription(username: string, lastname: string, email: string, password: string): string {
    const champs = [
      { nom: 'nom', valeur: username },
      { nom: 'prénom', valeur: lastname },
      { nom: 'email', valeur: email },
      { nom: 'mot de passe', valeur: password },
    ];
  
    for (const champ of champs) {
      if (typeof champ.valeur !== 'string') {
        return `❌ Le champ '${champ.nom}' doit être une chaîne de caractères.`;
      }
    }
  
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
  
    let contientChiffre = false;
    let contientMajuscule = false;
    let contientCaractereSpecial = false;
    const specialChars = [35, 36, 37, 64]; // #, $, %, @
  
    for (let i = 0; i < password.length; i++) {
      const code = password.charCodeAt(i);
      if (code >= 65 && code <= 90) contientMajuscule = true;
      if (code >= 48 && code <= 57) contientChiffre = true;
      if (specialChars.includes(code)) contientCaractereSpecial = true;
  
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
}

