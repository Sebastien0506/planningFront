import { Component, OnInit } from '@angular/core';
import { EmployesService } from './employes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employes.component.html',
  styleUrl: './employes.component.css'
})
export class EmployesComponent implements OnInit {
  employes: any[] = [];
  isLoading: boolean = false; // ✅ Déclaration

  constructor(private employesServices: EmployesService) {}

  ngOnInit(): void {
    this.viewAllEmployer();
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
}
