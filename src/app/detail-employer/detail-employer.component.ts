import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DetailEmployerService } from './detail-employer.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { AuthService } from '../auth-service.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-detail-employer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    NgxMatTimepickerModule, MatCheckboxModule
  ],
  templateUrl: './detail-employer.component.html',
  styleUrls: ['./detail-employer.component.css']
})
export class DetailEmployerComponent implements OnInit {
  selectedShop: number[] = [];
  username = '';
  lastname = '';
  email = '';
  contrat = '';
  start_job = '';
  end_job = '';
  employe: any;
  isLoading = true;

  private authServices = inject(AuthService);
  role = toSignal(this.authServices.role$);
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private detailEmployeService: DetailEmployerService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.userId = id;
        this.viewDetailEmployer(id);
      } else {
        console.error('Aucun ID trouvé dans l\'URL');
      }
    });
  }

  joursDisponibles : string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  onJourChange(checked: boolean, jour: string): void {
    const joursTravail = this.employe.working_day[0].working_day;
  
    if (checked && !joursTravail.includes(jour)) {
      joursTravail.push(jour);
    } else if (!checked && joursTravail.includes(jour)) {
      const index = joursTravail.indexOf(jour);
      if (index !== -1) {
        joursTravail.splice(index, 1);
      }
    }
  }

  timeToString(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  validInput(
    username: string,
    last_name: string,
    email: string,
    contrat: string,
    selectedShop: string[]
  ): string {
    const champs = [
      { nom: 'nom', valeur: username },
      { nom: 'prenom', valeur: last_name },
      { nom: 'email', valeur: email },
      { nom: 'contrat', valeur: contrat },
      { nom: 'shop', valeur: selectedShop }
    ];

    for (const champ of champs) {
      if (champ.nom !== 'shop' && typeof champ.valeur !== 'string') {
        return `Le champ ${champ.nom} doit être une chaîne de caractères.`;
      }
    }

    const isAlphaOnly = (str: string) => {
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        const isLetter = (char >= 65 && char <= 90) || (char >= 97 && char <= 122);
        const isAccent = (char >= 192 && char <= 255);
        const isUnderscore = char === 95;
        const isHyphen = char === 45;
        const isSpace = char === 32;

        if (!isLetter && !isAccent && !isUnderscore && !isHyphen && !isSpace) {
          return false;
        }
      }
      return true;
    };

    if (!isAlphaOnly(username)) {
      return "Le champ 'nom' est invalide.";
    }
    if (!isAlphaOnly(last_name)) {
      return "Le champ 'prénom' est invalide.";
    }
    if (!isAlphaOnly(contrat)) {
      return "Le champ 'contrat' est invalide.";
    }
    if (!email.includes('@') || !email.includes('.')) {
      return "Le champ 'email' est invalide.";
    }

    if (!Array.isArray(selectedShop) || selectedShop.length === 0) {
      return "Au moins un magasin doit être sélectionné.";
    }

    for (let shopName of selectedShop) {
      if (!isAlphaOnly(shopName)) {
        return `Le magasin '${shopName}' contient des caractères invalides.`;
      }
    }

    // ✅ Comparaison des heures
    const start = this.timeToString(this.employe.working_day[0].start_job);
    const end = this.timeToString(this.employe.working_day[0].end_job);
    if (start >= end) {
      return "L'heure de fin doit être après l'heure de début.";
    }

    return 'Données valides.';
  }

  onShopChange(checked: boolean, shopId: number): void {
    if (checked && !this.selectedShop.includes(shopId)) {
      this.selectedShop.push(shopId);
    } else if (!checked) {
      this.selectedShop = this.selectedShop.filter(id => id !== shopId);
    }
  }

  viewDetailEmployer(userId: number): void {
    this.detailEmployeService.detailEmploye(userId).subscribe({
      next: (data) => {
        this.employe = data;
         
        this.selectedShop = (this.employe.magasin_employe || []).map((shop: any) => shop.id);
        console.log('Shops de l\'employé :', this.selectedShop);
       
        // Corriger les heures si elles ont un format "HH:mm:ss"
        if (this.employe?.working_day?.length) {
          this.employe.working_day[0].start_job = this.employe.working_day[0].start_job.slice(0, 5);
          this.employe.working_day[0].end_job = this.employe.working_day[0].end_job.slice(0, 5);
        }
        console.log(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error("Erreur lors de la récupération de l'employé", err);
      }
    });
  }

  viewAllDetail() {
    console.log(this.employe?.username);
    console.log(this.employe?.last_name);
    console.log(this.employe?.contrat_employe?.contrat_name);
    console.log(this.employe?.email);
    console.log(this.selectedShop);
  }
  
  updateEmployer(): void {
    const contratName = this.employe.contrat_employe?.contrat_name?.trim().toLowerCase();

    // console.log("contrat à chercher :", contratName);
    const selectedContrat = this.employe.contrats_data?.find(
      (c: any) => c.contrat_name?.trim().toLowerCase() === contratName
      
    );

    console.log("Shop envoyé : ", this.selectedShop);
      if(!selectedContrat){
        console.error("Contrat non trouvé: ", this.employe.contrat_employe?.contrat_name);
      }
    const data = {
      username: this.employe.username,
      last_name: this.employe.last_name,
      email: this.employe.email,
      contrat: selectedContrat.id,
      magasin: this.selectedShop,
      working_day: {
        working_day: this.employe.working_day[0]?.working_day || [],
        start_job: this.employe.working_day[0]?.start_job,
        end_job: this.employe.working_day[0]?.end_job
      }
    };
  console.log("Shop envoyé :", this.selectedShop);
    this.detailEmployeService.sendRequestData(this.userId, data).subscribe({
      next: () => {
        alert("Employer mis à jour.")
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour :", err.error);
      }
    });
  }

}