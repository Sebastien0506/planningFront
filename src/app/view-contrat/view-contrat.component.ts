import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContratService } from './contrat.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModifyContratComponent } from '../modify-contrat/modify-contrat.component';


@Component({
  selector: 'app-view-contrat',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './view-contrat.component.html',
  styleUrl: './view-contrat.component.css'
})
export class ViewContratComponent {
     private authService = inject(AuthService);
     role = toSignal(this.authService.role$);
     contrat: any[] = [];
     columnsToDisplay = ['contrat_name', 'actions'];
     //Au chargement de la page on fait la requête pour récupérer les contrats
     ngOnInit() {
      this.retrieveContrat();
     }
     constructor( private contratService: ContratService, private dialog: MatDialog) {}
     ouvrirFormulaire(contratId: number) {
      this.dialog.open(ModifyContratComponent, {
        width: '700px',
        height: '700px',
        data: {contratId}
      })
     }
     retrieveContrat(): void {
      this.contratService.retrieveAllContrat().subscribe({
        next: (data) => {
          this.contrat = data;
          console.log("Donnée reçut:" , data);
        }, 
        error: (err) => {
          console.log(err);
        }
      });
      
     }
     
}
