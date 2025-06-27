import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-vacation',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, FormsModule],
  templateUrl: './add-vacation.component.html',
  styleUrl: './add-vacation.component.css'
})
export class AddVacationComponent {
startDate!: Date;
endDate!: Date;

}
