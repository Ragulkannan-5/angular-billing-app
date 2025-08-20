import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './pages/billing/billing.component';
import { PrintInvoiceComponent } from './pages/print-invoice/print-invoice.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'auth/dashbord',
    pathMatch: 'full',
  },
  { path: 'auth/dashbord', component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
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
