import { Component, HostListener, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Product, ProductService } from '../../services/product.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import { BillDetails, CommonService } from '../../commonservice/common.service';
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
import Swal from 'sweetalert2';

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
  readonly panelOpenState = signal(true);
  constructor(private router: Router, public commonService: CommonService, private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    var apiUrl = (window as any).appConfig.apiurl;
    this.http.get<any[]>(apiUrl + 'Productlist/Getproduct').subscribe(data => {
      this.products = data;
    });
  }

  swich() {
    this.commonService.extradis = !this.commonService.extradis
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
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

  // Add ripple effect
  addRipple(event: MouseEvent, btn: HTMLElement) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  async runAction(btn: HTMLElement, workingText: string, doneText: string, workFn: () => Promise<void>) {
    const icon = btn.querySelector('.icon') as HTMLElement;
    const label = btn.querySelector('.label') as HTMLElement;

    const origIcon = icon.outerHTML;
    const origText = label.textContent;

    // Loading state
    btn.classList.add('loading');
    label.textContent = workingText;
    icon.replaceWith(Object.assign(document.createElement('span'), { className: 'spinner' }));

    try {
      await workFn();
      // Success
      btn.classList.remove('loading');
      btn.classList.add('success');
      label.textContent = doneText;

      const check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      check.setAttribute('viewBox', '0 0 24 24');
      check.setAttribute('class', 'check pop');
      check.innerHTML = '<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      btn.querySelector('.spinner')?.replaceWith(check);

      await new Promise(res => setTimeout(res, 1000));
    } finally {
      // Reset
      btn.classList.remove('success', 'loading');
      label.textContent = origText ?? '';
      btn.querySelector('.check')?.remove();

      const temp = document.createElement('div');
      temp.innerHTML = origIcon.trim();
      btn.insertBefore(temp.firstChild as Node, label);
    }
  }

  // Mock Save
  async fakeSave() {
    await new Promise(res => setTimeout(res, 1000));
  }

  // File Download
  doDownload(filename: string = 'file.txt', content: string = 'Hello Angular!') {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async handleSave(btn: HTMLElement, event: MouseEvent) {
    this.addRipple(event, btn);
    await this.runAction(btn, 'Saving…', 'Saved!', () => this.fakeSave());
  }

  async handleDownload(btn: HTMLElement, event: MouseEvent) {
    this.addRipple(event, btn);
    await this.runAction(btn, 'Preparing…', 'Ready!', async () => {
      await new Promise(res => setTimeout(res, 800));
      this.doDownload('invoice.pdf', 'Sample Angular download file.');
    });
  }

  savebill() {
    if (this.commonService.clientname == '' || this.commonService.clientphoneno == '' || this.commonService.clientAddress == '') {
      //alert("Enter the Client Details")
      Swal.fire({
        title: 'Error!',
        text: 'Enter the Client Details',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    var BillDetailslist: any = {
      billNo: this.commonService.estimateNo,
      billcreatedate: this.commonService.estimateDate,
      clientname: this.commonService.clientname,
      phoneno: this.commonService.clientphoneno,
      address: this.commonService.clientAddress,
      billstatus: "Completed",
      billjson: this.commonService.rows,
    };
    this.commonService.SaveBill(BillDetailslist).subscribe((res: any) => {
      if (res.status === 'inserted') {
        Swal.fire({
          title: 'Inserted',
          text: `✅ Bill Inserted. Bill No: ${res.billId}`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else if (res.status === 'updated') {
        Swal.fire({
          title: 'Updated!',
          text: `✏️ Bill Updated. Bill No: ${res.billId}`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }

    });
  }

  pdfdownload() {

    this.savebill();
    var apiUrl = (window as any).appConfig.apiurl;
    const printContents = document.getElementById('printable-area')!.innerHTML;
    var payload = {
      "html": printContents,
      "header_data": "string",
      "pdfname": "string"
    };
    this.http.post<Blob>(apiUrl + 'PrintBill/PdfPreviewbyHandler', payload, {
      responseType: 'blob' as 'json'  // 👈 Tell Angular it's a Blob, not JSON
    })
      .subscribe((response: Blob) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL); // or download it
      }, error => {
        console.error('PDF preview error:', error);
      });


  }

}