import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Product, ProductService } from '../services/product.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
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
   constructor(private router: Router,public commonService :CommonService,private http: HttpClient,private dialog: MatDialog) {}
  ngOnInit(): void {
     this.http.get<any[]>('jsonfile/Generated.json').subscribe(data => {
      this.products = data;
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey) {
      this.addRow();
    }
  }

  openDialog() {
this.dialog.open(PreviewpdfComponent, {
width: '1320px',
maxHeight:'900px;',
data: { message: 'Hello, Angular Material!' },
});
}


goToPrint() {
  this.router.navigate(['/print-invoice'], {
    state: {
    }
  });
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
        p.name === row.productName
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

  printContent() {
 
  const printContents = document.getElementById('printable-area')!.innerHTML;

  const originalContents = document.body.innerHTML;

  // Replace the entire body with just the content to print
  document.body.innerHTML = printContents;

  window.print(); // ⬅️ This opens the real system print dialog

  document.body.innerHTML = originalContents;
  location.reload(); // reload to restore Angular bindings

}

}