import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../auth-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { AddEmployeService, Magasin } from './add-employe.service';
import { CommonModule } from '@angular/common';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';




@Component({
  selector: 'app-add-employe',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatCheckboxModule, MatButtonModule, CommonModule,
    NgxMatTimepickerModule
  ],
  templateUrl: './add-employe.component.html',
  styleUrl: './add-employe.component.css'
})
export class AddEmployeComponent {
  selectedShop: number[] = [];
  magasins: any[] = [];
  contrats: any[] = [];
      employe = {
        name: '',
        lastname: '',
        email: '',
        magasin : [],
        contrat: {
          contrat_name: '',
        },
        working_day: {
          working_day: [] as string[],
          start_job: '',
          end_job: '',
        },
      };
    
      ngOnInit(): void {
          this.addEmployerService.retrieveAllContrat().subscribe({
            next: (res) => {
              console.log("Contrat trouvé : ", res);
            },
            error: (err) => {
              console.log("Erreur :", err);
            }
          });
          this.addEmployerService.retrieveAllShop().subscribe({
            next: (res) => {
              this.magasins = res;
              console.log("magasin" , res);
            },
            error: (err) => {
              console.log("Erreur :", err);
            }
          });
          this.addEmployerService.retrieveAllContrat().subscribe({
            next: (res) => {
              this.contrats = res;
            },
            error: (err) => {
              alert(err);
            }
          })
      }
      private authServices = inject(AuthService);
      role = toSignal(this.authServices.role$);
      constructor(private dialogRef: MatDialogRef<AddEmployeComponent>, private addEmployerService: AddEmployeService) {}
      joursDisponible = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
      toggleJour(jour: string, checked: boolean) {
        const jours = this.employe.working_day.working_day;
        const index = jours.indexOf(jour);

        if(checked && index === -1) {
          jours.push(jour);
        } else if (!checked && index > -1){
             jours.splice(index, 1);
        }

      }
      validInput(username: string, lastname: string, email: string, magasins: string[]): string {
        const champs = [
          { nom: 'nom', valeur: username },
          { nom: 'prenom', valeur: lastname },
          { nom: 'email', valeur: email }
        ];
      
        for (const champ of champs) {
          if (typeof champ.valeur !== 'string') {
            return `Le champ ${champ.nom} doit être une chaîne de caractères.`;
          }
        }
      
        const isAlphaOnly = (str: string) => {
          for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            const isLetter = (char >= 65 && char <= 90) || (char >= 97 && char <= 122);
            const isAccent = (char >= 192 && char <= 255);
            const isUnderscore = char === 95;
            const isHyphen = char === 45;
            const isSpace = char === 32;
            const isChiffre = (char >= 48 && char <= 57)
            if (!isLetter && !isAccent && !isUnderscore && !isHyphen && !isSpace && !isChiffre) {
              return false;
            }
          }
          return true;
        };
      
        if (!isAlphaOnly(username)) {
          return `Le nom '${username}' contient des caractères invalides.`;
        }
      
        if (!isAlphaOnly(lastname)) {
          return `Le prénom '${lastname}' contient des caractères invalides.`;
        }
      
        if (!email.includes("@") || !email.includes(".")) {
          return `L'adresse email '${email}' n'est pas valide.`;
        }
      
        if (!Array.isArray(magasins) || magasins.length === 0) {
          return "Au moins un magasin doit être sélectionné.";
        }
      
        for (const shopName of magasins) {
          if (!isAlphaOnly(shopName)) {
            return `Le nom du magasin '${shopName}' contient des caractères invalides.`;
          }
        }
      
        return "Employer ajouté";
      }

      onSubmit() {
        console.log('Employé ajouté :', this.employe);
        this.dialogRef.close(); // Ferme la modale après ajout
      }
      ajouterEmploye() {
        const magasinsIds = this.magasins
          .filter(m => m.checked)
          .map(m => Number(m.id));
        
        const magasinsNoms = this.magasins.filter(m => m.checked).map(m => m.shop_name);
      
        const contratsCochés = this.contrats.filter(c => c.checked);
        const premierContrat = contratsCochés[0];
        const contratId = premierContrat?.id;
        const validationMessage = this.validInput(
          this.employe.name,
          this.employe.lastname,
          this.employe.email,
          magasinsNoms
        );
      
        if (validationMessage !== "Employer ajouté") {
          alert(validationMessage);
          return;
        }
      
        // Préparation de la donnée finale à envoyer à l’API
        const data = {
          username: this.employe.name,         // requis par le serializer
          last_name: this.employe.lastname,
          email: this.employe.email,
          contrat: contratId,                  // un nombre
          magasins: magasinsIds,                  // tableau d'ID
          working_day: {
            working_day: this.employe.working_day.working_day,
            start_job: this.employe.working_day.start_job,
            end_job: this.employe.working_day.end_job
          }
        };
      
        console.log("Employé prêt à être ajouté :", data);
      
        this.addEmployerService.addEmploye(data).subscribe({
          next: () => {
            alert("Employé ajouté avec succès !");
            this.dialogRef.close(); // fermeture du dialog
          },
          error: (err) => {
            console.error("Erreur lors de l'ajout :", err);
            alert("Erreur lors de l'ajout de l'employé.");
          }
        });
      }
}
