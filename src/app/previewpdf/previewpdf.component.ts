import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-previewpdf',
  templateUrl: './previewpdf.component.html',
  styleUrl: './previewpdf.component.scss'
})
export class PreviewpdfComponent {
//@ViewChild('printSection') printSection!: ElementRef;

constructor(public commonService :CommonService){
  
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
