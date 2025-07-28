import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { BillingComponent } from './billing/billing.component';
import { AppRoutingModule } from "./app-routing.module";
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { PreviewpdfComponent } from './previewpdf/previewpdf.component';
import { MatDialogModule, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
@NgModule({
  declarations: [
    AppComponent,
    BillingComponent,
    PrintInvoiceComponent,
    PreviewpdfComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,
    AppRoutingModule,
    MatDialogContent,
    MatDialogActions
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }