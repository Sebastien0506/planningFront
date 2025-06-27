import { Component, OnInit } from '@angular/core';
import { VacanceService, Vacance } from './vacance.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddVacationComponent } from '../add-vacation/add-vacation.component';


@Component({
  selector: 'app-vacance',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './vacance.component.html',
  styleUrl: './vacance.component.css'
})
export class VacanceComponent implements OnInit {
  // On définit la variable qui va récupérer les données.
  vacation !: Vacance;



  constructor(private vacationService: VacanceService, private dialog: MatDialog){}

 ouvrireFormulaire() {
  this.dialog.open(AddVacationComponent, {
      height: '700px',
      width: '700px',
  });
 }
  ngOnInit(): void {
    this.vacationService.getVacance().subscribe({
      next: (data) => {
        this.vacation = data;
      },
      error: (err) => {
         console.error("Impossible de récupérer les demandes de vacances.", err);
      }
    });
  }

}
