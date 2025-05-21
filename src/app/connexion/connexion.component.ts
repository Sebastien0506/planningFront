import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';

  // ✅ Vérifie l'email et le mot de passe saisis
  valideInput(email: string, password: string): void {
    // Vérifie que l'email est bien une chaîne
    if (typeof email !== 'string') {
      console.log("❌ L'email doit être une chaîne de caractères.");
      return;
    }

    // Vérifie que l'email contient bien un @ et un .
    if (!email.includes('@') || !email.includes('.')) {
      console.log('❌ Email invalide : il doit contenir @ et .');
      return;
    }

    // Vérifie que chaque caractère est autorisé
    for (let i = 0; i < email.length; i++) {
      const code = email.charCodeAt(i);
      if (
        !(code >= 48 && code <= 57) &&  // 0-9
        !(code >= 65 && code <= 90) &&  // A-Z
        !(code >= 97 && code <= 122) && // a-z
        code !== 95 &&  // _
        code !== 64 &&  // @
        code !== 46     // .
      ) {
        console.log('❌ Email invalide : caractère non autorisé →', email[i]);
        return;
      }
    }

    console.log('✅ Email valide.');

    // Vérification du mot de passe
    if (typeof password !== 'string' || password.length < 6) {
      console.log("❌ Mot de passe invalide : il doit contenir au moins 6 caractères.");
      return;
    }

    let contientChiffre = false;
    let contientCaractereSpecial = false;

    for (let i = 0; i < password.length; i++) {
      const code = password.charCodeAt(i);

      if (code >= 48 && code <= 57) {
        contientChiffre = true;
      }

      if (code === 35 || code === 36 || code === 37 || code === 64) {
        contientCaractereSpecial = true;
      }

      if (
        !(code >= 48 && code <= 57) &&  // 0-9
        !(code >= 65 && code <= 90) &&  // A-Z
        !(code >= 97 && code <= 122) && // a-z
        code !== 35 && code !== 36 && code !== 37 && // # $ %
        code !== 64
      ) {
        console.log('❌ Mot de passe invalide : caractère non autorisé →', password[i]);
        return;
      }
    }

    if (!contientChiffre || !contientCaractereSpecial) {
      console.log("❌ Mot de passe invalide : il doit contenir au moins un chiffre et un caractère spécial (#, $, %, @).");
      return;
    }

    console.log('✅ Mot de passe valide.');
  }

  // 📦 Méthode pour afficher les valeurs si besoin
  afficherValeurs(): void {
    console.log('Email :', this.email);
    console.log('Password :', this.password);
  }
}

