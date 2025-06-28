import { Component, inject } from '@angular/core';
import { VacanceService, Vacance } from './vacance.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddVacationComponent } from '../add-vacation/add-vacation.component';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../auth-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { effect } from '@angular/core';


@Component({
  selector: 'app-vacance',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule],
  templateUrl: './vacance.component.html',
  styleUrl: './vacance.component.css'
})
export class VacanceComponent {
  // On définit la variable qui va récupérer les données.
  vacation : Vacance[] = [];
  vacationAll : Vacance[] =[];
  columnsToDisplay = ['username', 'last_name','start_day', 'end_day', 'status', 'actions'];
  

 constructor(private vacationService: VacanceService, private dialog: MatDialog)
 { effect(() => {
    const currentRole = this.role();
    if (!currentRole) return;

    if (currentRole === 'superadmin') {
      this.vacationService.getVacanceAll().subscribe({
        next: (data) => {
          this.vacationAll = data;
          console.log('Vacances superadmin : ', this.vacationAll);
        },
        error: (err) => {
          console.error("Erreur lors de la récupération des vacances.", err)
        }
        
      });
    } else {
      this.vacationService.getVacance().subscribe({
        next: (data) => {
          this.vacation = data;
          console.log('Vacance utilisateur :', this.vacation);
        },
        error : (err) => {
          console.error("Erreur lors de la récupération des vacances.", err)
        }
      });
    }
 })};
 private authService = inject(AuthService);
 role = toSignal(this.authService.role$);
 
 ouvrireFormulaire() {
  this.dialog.open(AddVacationComponent, {
      height: '700px',
      width: '700px',
  });
 }

  // ngOnInit(): void {
  //   console.log("Role de l'utilisateur :", this.role())
  //   if(this.role() === "superadmin") {
  //     this.vacationService.getVacanceAll().subscribe({
  //       next: (data) => {
  //         this.vacationAll = data;
  //       },
  //       error: (err) => {
  //         console.error("Impossible de récupérer les demandes de vacances.", err);
  //       }
  //     });
  //   } else {
  //     this.vacationService.getVacance().subscribe({
  //       next: (data) => {
  //         this.vacation = data;
  //       },
  //       error: (err) => {
  //          console.error("Impossible de récupérer les demandes de vacances.", err);
  //       }
  //     });
  //   }
  // }

}
