import { Component, OnInit } from '@angular/core';
import { ProfilService, User } from './profil.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user!: User;
  constructor(private profilService: ProfilService) {}
  ngOnInit(): void {
    this.profilService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
      }
    });
  }
}
