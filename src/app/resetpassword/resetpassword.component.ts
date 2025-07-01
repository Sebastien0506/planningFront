import { Component } from '@angular/core';
import { ResetpasswordService } from './resetpassword.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
   
  constructor(private resetpasswordService: ResetpasswordService) {}
  email: string = '';

  resetPassword() {

    const data = {
      email: this.email
    }
      this.resetpasswordService.sendRequestReset(data).subscribe({
        next:(ress) => {
          alert("Email envoyé");
          console.log(ress);
        },
        error: (err) => {
          console.error("Erreur lors de l'envoi", err);
        }
      })
  }

}
