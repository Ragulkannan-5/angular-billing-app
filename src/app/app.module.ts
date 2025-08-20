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
import { BillingComponent } from './pages/billing/billing.component';
import { AppRoutingModule } from "./app-routing.module";
import { PrintInvoiceComponent } from './pages/print-invoice/print-invoice.component';
import { PreviewpdfComponent } from './pages/previewpdf/previewpdf.component';
import { MatDialogModule, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { MatCard, MatCardHeader, MatCardContent, MatCardTitle, MatCardSubtitle, MatCardActions, MatCardTitleGroup } from "@angular/material/card";
import { ClientdetailsComponent } from './Component/clientdetails/clientdetails.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProductlistpageComponent } from './pages/productlistpage/productlistpage.component';
import { MatPaginator } from "@angular/material/paginator";
import { MatSelect } from "@angular/material/select";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { ProductaddeditComponent } from './Component/productaddedit/productaddedit.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { BilldetailspageComponent } from './pages/billdetailspage/billdetailspage.component';
@NgModule({
  declarations: [
    AppComponent,
    BillingComponent,
    PrintInvoiceComponent,
    PreviewpdfComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    ClientdetailsComponent,
    ProductlistpageComponent,
    ProductaddeditComponent,
    BilldetailspageComponent
  ],
  imports: [
    MatGridListModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
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
    MatDialogActions,
    MatCard,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatPaginator,
    MatSelect,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatCardTitleGroup
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }