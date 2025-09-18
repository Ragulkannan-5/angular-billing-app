import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PreviewpdfComponent } from '../../pages/previewpdf/previewpdf.component';
import { CommonService } from '../../commonservice/common.service';
import { HttpClient } from '@angular/common/http';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
interface BillDetails {
  billNo?: number;
  clientname: string;
  phoneno?: string;
  address: string;
  billstatus: string;
  billcreateDate?: Date;
  lastupdateDate?: Date;
  billjson?: any;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router,private dialog: MatDialog,public  commonService:CommonService,private http: HttpClient,){}

  goToPrint() {
    this.router.navigate(['Productlist'], {
      state: {
      }
    });
  }
  sidnavtogglefun() {
   this.commonService.Issidenav = !this.commonService.Issidenav;
  }

  openDialog() {
    this.savebill();
    console.log(this.commonService.rows)
    // this.dialog.open(PreviewpdfComponent, {
    // width: '1320px',
    // maxHeight:'900px;',
    // data: { message: 'Hello, Angular Material!' },
    // });
    
  }

  savebill(){
    if(this.commonService.clientname == '' || this.commonService.clientphoneno == '' || this.commonService.clientAddress==''){
    alert("Enter the Client Details")
    return;
  }
  var BillDetailslist : BillDetails = {
   billNo: this.commonService.estimateNo,
  clientname: this.commonService.clientname,
  phoneno: this.commonService.clientphoneno,
  address: this.commonService.clientAddress,
  billstatus: "Completed",
  billjson: this.commonService.rows,
};
var json = {};
    this.commonService.SaveBill(BillDetailslist).subscribe((res: any) => {
      if (res.status === 'inserted') {
        alert(`✅ Bill Inserted. Bill No: ${res.billId}`);
      } else if (res.status === 'updated') {
        alert(`✏️ Bill Updated. Bill No: ${res.billId}`);
      }
      
    });
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

 pdfdownload(){
  
  // this.savebill();
  var apiUrl = (window as any).appConfig.apiUrl;
   const printContents = document.getElementById('printable-area')!.innerHTML;
    var payload ={
                "html": printContents,
                "header_data": "string",
                "pdfname": "string"
              };
this.http.post<Blob>(apiUrl+'PrintBill/PdfPreviewbyHandler', payload, {
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
