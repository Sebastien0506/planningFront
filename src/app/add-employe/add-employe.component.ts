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



@Component({
  selector: 'app-add-employe',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatCheckboxModule, MatButtonModule, CommonModule],
  templateUrl: './add-employe.component.html',
  styleUrl: './add-employe.component.css'
})
export class AddEmployeComponent {
  magasins: any[] = [];
      employe = {
        name: '',
        lastname: '',
        email: '',
        magasins : [],
        contrat: {
          contrat_name: '',
        },
        working_day: {
          working_day: '',
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
      }
      private authServices = inject(AuthService);
      role = toSignal(this.authServices.role$);
      constructor(private dialogRef: MatDialogRef<AddEmployeComponent>, private addEmployerService: AddEmployeService) {}
      jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
      onSubmit() {
        console.log('Employé ajouté :', this.employe);
        this.dialogRef.close(); // Ferme la modale après ajout
      }
}
