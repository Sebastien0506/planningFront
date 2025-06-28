import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { AddVacationService } from './add-vacation.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-vacation',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, FormsModule],
  templateUrl: './add-vacation.component.html',
  styleUrl: './add-vacation.component.css',
  providers: [DatePipe]
})
export class AddVacationComponent {
startDate!: Date;
endDate!: Date;

constructor(private addVacationService: AddVacationService, private datePipe: DatePipe){}
//On déclare les variables pour stocker les données.
afficherData() {
  console.log(this.startDate);
  console.log(this.endDate);
 }
 validateInput(start_day: Date, end_day: Date): string {
  const isValidDate = (d: any): boolean => {
    return d instanceof Date && !isNaN(d.getTime());
  };

  if (!isValidDate(start_day)) {
    return 'Le champ start_day doit être une date valide.';
  }

  if (!isValidDate(end_day)) {
    return 'Le champ end_day doit être une date valide.';
  }

  if (start_day > end_day) {
    return 'La date de début doit être antérieure à la date de fin.';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (start_day < today) {
    return 'La date de début ne peut pas être dans le passé.';
  }

  return 'Données valides.';
}

sendVacationRequest() {
  const validateMessage = this.validateInput(this.startDate, this.endDate);

  if(validateMessage !== "Données valides."){
    console.error("Les données ne sont pas valide.");
  }
  
  const data = {
    start_day: this.datePipe.transform(this.startDate, 'yyyy-MM-dd') || '',
    end_day: this.datePipe.transform(this.endDate, 'yyyy-MM-dd') || '',
  };
  this.addVacationService.sendVacation(data).subscribe({
    next: () => {
      alert("Donnée sauvegarder");
    },
    error: (err) => {
       console.error("Erreur lors de la sauvegarde.", err);
    }
  });
}
}
