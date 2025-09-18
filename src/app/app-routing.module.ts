import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './pages/billing/billing.component';
import { PrintInvoiceComponent } from './pages/print-invoice/print-invoice.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductlistpageComponent } from './pages/productlistpage/productlistpage.component';
import { BilldetailspageComponent } from './pages/billdetailspage/billdetailspage.component';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'Billing',
    pathMatch: 'full',
  },
  { path: '',
    component: DashboardComponent,
    children: [
       {
    path: 'Billing',
    component:BillingComponent
    //loadChildren: () => import('../billing/billing.component').then(m => m.BillingComponent),
  },
  {
    path: 'Productlist',
    pathMatch: 'full',
    component:ProductlistpageComponent
   // loadChildren: () => import('../productlistpage/productlistpage.component').then(m => m.ProductlistpageComponent),
  },
  {
    path: 'Billdetails',
    pathMatch: 'full',
    component:BilldetailspageComponent
    //loadChildren: () => import('../billdetailspage/billdetailspage.component').then(m => m.BilldetailspageComponent),
  },
  {
    path: '',
    redirectTo: 'Billing',
    pathMatch: 'full',
  },
    ]
   },
  { path: 'print-invoice', component: PrintInvoiceComponent },
   { path: '**', redirectTo: 'auth/dashbord' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
