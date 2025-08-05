import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { PlanningService } from './planning.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css'
})
export class PlanningComponent {
  allPlannings: any[] = []; 
  allUsers: any[] = [];
  currentUser: any;
  role: string = '';
  selectedUserIds: number[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: []
  };

  constructor(private planningService: PlanningService) {}
  ngOnInit() {
    this.planningService.getConnectedUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.role = user.role;

        this.planningService.retrievePlanning().subscribe({
          next: (plannings) => {
            this.allPlannings = plannings;
            console.log(this.allPlannings);
            if (this.role === 'employe') {
              this.selectedUserIds = [this.currentUser.id];
              this.applyFilter();
            } else {
              // Pour admin/superadmin, charger la liste des utilisateurs
              this.planningService.getAllUsers().subscribe({
                next: (users) => {
                  this.allUsers = users;
                  this.selectedUserIds = users.map(u => u.id); // Tous affichés par défaut
                  this.applyFilter();
                }
              });
            }
          }
        });
      }
    });
  
  }

  applyFilter() {
    console.log("applyFilter() appelé");
    const filteredEvents = this.allPlannings
      .filter(e => this.role === 'employe' ? this.selectedUserIds.includes(e.user) : true)
      .map(entry => {
        const user = this.allUsers.find(u => u.id === entry.user); // 🔍 chercher les infos utilisateur
        console.log("Utilisateur trouvé : ", user);
        return {
          title: entry.label + (user ? ` - ${user.username} ${user.last_name}` : ''),
          start: entry.date + (entry.start_hour ? 'T' + entry.start_hour : ''),
          end: entry.date + (entry.end_hour ? 'T' + entry.end_hour : '')
        };
      });
  
    this.calendarOptions.events = filteredEvents;
    console.log("✅ Events filtrés :", this.allPlannings);
  }

  onUserSelectionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    const selectedOptions = selectElement.selectedOptions;
    const ids : number[] = [];

    for (let i = 0; i < selectedOptions.length; i++) {
      const option = selectedOptions.item(i);
      if(option) {
        ids.push(Number(option.value));
      }
    }
    this.selectedUserIds = ids;
    this.applyFilter();
}
}