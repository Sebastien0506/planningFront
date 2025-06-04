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
import { ModifyShopComponent } from '../modify-shop/modify-shop.component';

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
  shop_name: any;

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
  //on créé le module pour modifier un magasin
  ouvrirFormulaireModify(shopId: number) {
    this.dialog.open(ModifyShopComponent, {
      height: '700px',
      width: '700px',
      data: {shopId}
    })
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
  //On crée la fonction pour supprimer un magasin.
  onDeleteShop(shopId: number) {//shopId est l'id du magasin que l'on veut supprimer
    //On ajoute une boite de confirmation
    if( confirm("Voulez vous vraiment supprimer ce magasin ?")){
      //On fait appel à la fonction qui permet d'envoyer la requête.
      this.shopService.deleteShop(shopId).subscribe({
        //On affiche les messages.
        next: () => {
          alert("Magasin supprimer avec succès.");
        },
        error: () => {
          alert("Erreur lors de la suppression");
        }
      });
    }
  }
}


