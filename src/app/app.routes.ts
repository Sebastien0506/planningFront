import { Routes } from '@angular/router';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployesComponent } from './employes/employes.component';
import { DetailEmployerComponent } from './detail-employer/detail-employer.component';
import { ViewContratComponent } from './view-contrat/view-contrat.component';
import { ShopComponent } from './shop/shop.component';
import { ProfilComponent } from './profil/profil.component';
import { Component } from '@angular/core';
import { VacanceComponent } from './vacance/vacance.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
export const routes: Routes = [
    {path: 'navBar', component: NavBarComponent},
    {path: 'inscription', component: InscriptionComponent},
    {path: 'connexion', component: ConnexionComponent},
    {path: 'adminDashboard', component: AdminDashboardComponent},
    {path: 'viewAllEmployes', component: EmployesComponent},
    {path: 'viewDetailEmployer/:id', component: DetailEmployerComponent},
    {path: 'viewAllShop', component: ShopComponent},
    {path: 'viewAllContrat', component: ViewContratComponent},
    {path: 'profil', component: ProfilComponent},
    {path: 'vacance', component: VacanceComponent},
    {path: 'resetpassword', component: ResetpasswordComponent},
    {path: 'newpassword', component: NewpasswordComponent}

    
];
