import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';

const routes: Routes = [
  { path: '', component: BillingComponent },
  { path: 'print-invoice', component: PrintInvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
