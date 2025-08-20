import { Component, HostListener, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Product, ProductService } from '../../services/product.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import { CommonService } from '../../commonservice/common.service';
import { HttpClient } from '@angular/common/http';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PrintInvoiceComponent } from '../print-invoice/print-invoice.component';
import { PreviewpdfComponent } from '../previewpdf/previewpdf.component';
import { ClientdetailsComponent } from '../../Component/clientdetails/clientdetails.component';

interface ProductRow {
  productName: string;
  quantity: number;
  price: number;
  total: number;
  discountPrice: number;
}
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  products: any[] = [];
  readonly panelOpenState = signal(false);
   constructor(private router: Router,public commonService :CommonService,private http: HttpClient,private dialog: MatDialog) {}
  
   ngOnInit(): void {
     this.http.get<any[]>('http://localhost:7200/Productlist/Getproduct').subscribe(data => {
      this.products = data;
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey) {
      this.addRow();
    }
  }

  // products = [
  //   { name: "Gaming Mouse", price: 500 },
  //   { name: "Gaming Keyboard", price: 1200 },
  //   { name: "Board Game", price: 800 },
  //   { name: "Firecrackers", price: 300 },
  //   { name: "Game Controller", price: 1500 },
  //   { name: "Tennis Ball", price: 100 }
  // ];

  

  addRow() {
    this.commonService.rows.push({ productName: '', quantity: 1, price: 0, total: 0, discountPrice: 0 });
  }

  deleteRow(index: number) {
    if (this.commonService.rows.length > 1) this.commonService.rows.splice(index, 1);
  }

  onProductChange(row: ProductRow) {
    const found = this.products.find(p => 
        p.productName === row.productName
    );
    if (found) {
      row.price = found.price;
    }
    this.recalculate(row);
  }

  recalculate(row: ProductRow) {
    const subtotal = row.price * row.quantity;
    const discountAmount = (subtotal * this.commonService.discountPercent) / 100;
    row.discountPrice = parseFloat(discountAmount.toFixed(2));
   // row.total = parseFloat((subtotal - discountAmount).toFixed(2));
   row.total = subtotal
  }

  recalculateAll() {
    this.commonService.rows.forEach(row => this.recalculate(row));
  }

  openClientDialog(): void {
  const dialogRef = this.dialog.open(ClientdetailsComponent, {
    width: '100%',
    maxWidth: '500px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Client Details:', result);
    }
  });
  }

 

}