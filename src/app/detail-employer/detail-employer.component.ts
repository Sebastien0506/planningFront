import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DetailEmployerService } from './detail-employer.service';

@Component({
  selector: 'app-detail-employer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-employer.component.html',
  styleUrls: ['./detail-employer.component.css']
})
export class DetailEmployerComponent implements OnInit {
  employe: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private detailEmployeService: DetailEmployerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('id'));
      if (userId) {
        this.viewDetailEmployer(userId);
      } else {
        console.error("Aucun ID trouvé dans l'URL");
      }
    });
  }

  viewDetailEmployer(userId: number): void {
    this.detailEmployeService.detailEmploye(userId).subscribe({
      next: (data) => {
        this.employe = data;
        this.isLoading = false;
        console.log("Détail de l'employé :", data);
      },
      error: (err) => {
        this.isLoading = false;
        console.error("Erreur lors de la récupération de l'employé", err);
      }
    });
  }
}
