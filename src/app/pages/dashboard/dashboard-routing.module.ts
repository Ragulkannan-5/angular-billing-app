import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BillingComponent } from '../billing/billing.component';

const routes: Routes = [
   {
    path: 'Billing',
    component:BillingComponent
    //loadChildren: () => import('../billing/billing.component').then(m => m.BillingComponent),
  },
  {
    path: 'Productlist',
    pathMatch: 'full',
    loadChildren: () => import('../productlistpage/productlistpage.component').then(m => m.ProductlistpageComponent),
  },
  {
    path: 'Billdetails',
    pathMatch: 'full',
    loadChildren: () => import('../billdetailspage/billdetailspage.component').then(m => m.BilldetailspageComponent),
  },
  {
    path: '',
    redirectTo: 'Billing',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
