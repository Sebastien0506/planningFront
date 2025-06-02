import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ShopService } from './shop.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddShopComponent } from '../add-shop/add-shop.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatTableModule, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  private authService = inject(AuthService);
  role = toSignal(this.authService.role$);

  shop: any[] = [];
  displayedColumns: string[] = ['shop_name', 'actions'];

  constructor(private shopService: ShopService, private dialog: MatDialog) {}

  ngOnInit() {
    this.retrieveDataShop();
  }
  ouvrirFormulaireAdd(){
    this.dialog.open(AddShopComponent, {
      height: '700px',
      width: '700px',
    });
    
  }

  retrieveDataShop(): void {
    this.shopService.envoyerShop().subscribe({
      next: (data) => {
        this.shop = data;
        console.log("Magasins reçus :", data);
      },
      error: (err) => {
        console.error("Erreur API :", err);
      }
    });
  }
}


