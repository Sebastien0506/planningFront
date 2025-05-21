import { Component } from '@angular/core';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

}

export function validationInscription() : boolean {
  return true;
}