import { Routes } from '@angular/router';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
export const routes: Routes = [
    {path: 'navBar', component: NavBarComponent},
    {path: 'inscription', component: InscriptionComponent},
    {path: 'connexion', component: ConnexionComponent},

    
];
