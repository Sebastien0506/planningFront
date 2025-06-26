import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-modify-contrat',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './modify-contrat.component.html',
  styleUrl: './modify-contrat.component.css'
})
export class ModifyContratComponent {
     
     constructor(@Inject(MAT_DIALOG_DATA) public data: {contratId: number}){}
}
