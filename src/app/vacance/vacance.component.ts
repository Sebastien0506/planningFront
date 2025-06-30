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
import { validateVacation } from './vacance.utils';


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



  // validateVacation(vacances: any): boolean {
  //     console.log(vacances);

  //     const startDay = new Date(vacances.start_day);
  //     const endDay = new Date(vacances.end_day);
  //     console.log(startDay, endDay);
      
  //     if(isNaN(startDay.getTime()) || isNaN(endDay.getTime())) {
  //       console.error('Date invalide');
  //       return false;
  //     }

  //     if(startDay.getTime() >= endDay.getTime()) {
  //       console.error('La date de début doit être antérieur à la date de fin.');
  //       return false;
  //     }
      
  //     if(vacances.status === 'accepted' || vacances.status === 'rejected'){
  //         alert(`Cette demande ne peut plus être modifier elle a déjà le status ${vacances.status}`);
  //         return false;
  //     }
  //     return true;
  // }

acceptedVacation(vacances: Vacance) {
  const validVacation = validateVacation(vacances);

  if (!validVacation) {
    console.error("Les données ne sont pas valides.");
    return;
  }

  const data = {
    start_day: vacances.start_day,
    end_day: vacances.end_day,
    status: 'accepted',
  };
console.log("Donnée de vacance envoyer", data);
  this.vacationService.updateVacationStatus(vacances.id, data).subscribe({
    next: () => {
      vacances.status = 'accepted';
      console.log('Status mis à jour :', vacances.status);
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour', err);
    }
  });
}
rejectedVacation(vacances: Vacance) {
  const validVacation = validateVacation(vacances);

  if (!validVacation) {
    console.error("Les données ne sont pas valides.");
    return;
  }

  const data = {
    start_day: vacances.start_day,
    end_day: vacances.end_day,
    status: 'accepted',
  };

  this.vacationService.updateVacationStatus(vacances.id, data).subscribe({
    next: () => {
      vacances.status = 'rejected';
      console.log('Status mis à jour :', vacances.status);
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour', err);
    }
  });
}


  

}
