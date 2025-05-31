import { Component, OnInit, inject } from '@angular/core';
import { EmployesService } from './employes.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeComponent } from '../add-employe/add-employe.component';
@Component({
  selector: 'app-employes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employes.component.html',
  styleUrl: './employes.component.css'
})
export class EmployesComponent implements OnInit {
  private authService = inject(AuthService);
  role = toSignal(this.authService.role$);
  
  employes: any[] = [];
  isLoading: boolean = false; // ✅ Déclaration

  constructor(private employesServices: EmployesService, private dialog: MatDialog) {}


  ngOnInit(): void {
    this.viewAllEmployer();
  }
  ouvrirFormulaireAdd(){
    this.dialog.open(AddEmployeComponent, {
      height: '700px',
      width: '700px',
    });
    
  }
  viewAllEmployer(): void {
    this.isLoading = true;
    this.employesServices.envoyerRequest().subscribe({
      next: (data) => {
        this.employes = data;
        this.isLoading = false; // ✅ bon nom
        console.log("Employés reçus :", this.employes);
      },
      error: (err) => {
        console.error("Erreur :", err);
        this.isLoading = false; // ✅ correction ici aussi
      }
    });
  }

  onDeleteUser(userId: number) {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      this.employesServices.deleteRequest(userId).subscribe({
        next: () => {
          alert("Utilisateur supprimé !");
        },
        error: (err) => {
          alert("Erreur lors de la suppression.");
        }
      });
    }
  }
}
