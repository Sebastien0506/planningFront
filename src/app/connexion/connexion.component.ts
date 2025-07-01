import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnexionService } from './connexion.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})

export class ConnexionComponent {
  email: string = '';
  password: string = '';

  constructor(private connexionService: ConnexionService, private router: Router, private authService: AuthService) {}
  ngOnInit(){
    this.authService.getCSRFToken().subscribe();
  }
  // ✅ Vérifie l'email et le mot de passe saisis
  valideInput(email: string, password: string): boolean {
    // Vérifie que l'email est bien une chaîne
    if (typeof email !== 'string') {
      console.log("❌ L'email doit être une chaîne de caractères.");
      return false;
    }

    // Vérifie que l'email contient bien un @ et un .
    if (!email.includes('@') || !email.includes('.')) {
      console.log('❌ Email invalide : il doit contenir @ et .');
      return false;
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
        return false;
      }
    }

    console.log('✅ Email valide.');

    // Vérification du mot de passe
    if (typeof password !== 'string' || password.length < 6) {
      console.log("❌ Mot de passe invalide : il doit contenir au moins 6 caractères.");
      return false;
    }
    //On initialise les variables pour les caractère spéciaux
    let contientChiffre = false;
    let contientCaractereSpecial = false;

    for (let i = 0; i < password.length; i++) {
      const code = password.charCodeAt(i);

      if (code >= 48 && code <= 57) {
        contientChiffre = true;
      }
      //On renseigne les caractères spéciaux que l'on veut
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
        return false;
      }
    }

    if (!contientChiffre || !contientCaractereSpecial) {
      console.log("❌ Mot de passe invalide : il doit contenir au moins un chiffre et un caractère spécial (#, $, %, @).");
      return false;
    }

    console.log('✅ Email et mot de passe valide.');
    return true;
  }

  // 📦 Méthode pour afficher les valeurs si besoin
  afficherValeurs(): void {
    console.log('Email :', this.email);
    console.log('Password :', this.password);
  }
  //On crée la fonction qui permet l'envoie des données au back
  envoyer() {
    //On vérifie si les données sont valide
    const estValide = this.valideInput(this.email, this.password);
    if(!estValide) {
      console.log("Données invalides, requête bloquée.");
      return;
    }
    //On stock les données dans la variable data
    const data = {
      email: this.email,
      password: this.password
    };
    //On envoie les données
   this.connexionService.envoyerConnexion(data).subscribe({
    next: (res) => {
      console.log('Connexion réussie', res);

      this.authService.fetchUserRole();
      //On redirige l'utilisteur
      setTimeout(() => this.router.navigate(['/']), 300);
      

    },
    error: (error) => {
      console.error('Erreur lors de la connexion : ', error);
    }
    
   });
  }

  
}

