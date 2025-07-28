import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrl: './print-invoice.component.scss'
})
export class PrintInvoiceComponent {
 @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
 @ViewChild('logoImg', { static: false }) logoImg!: ElementRef<HTMLImageElement>;
  currentDate: string = new Date().toLocaleDateString();

downloadPDF() {
  const content = this.pdfContent.nativeElement;

  html2canvas(content, { scrollY: -window.scrollY }).then((canvas) => {
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const margin = 5; // margin in mm
    const headerHeight = 20;
    const footerHeight = 15;

    const usableHeight = pdfHeight - headerHeight - footerHeight - (2 * margin);
    const usableWidth = pdfWidth - (2 * margin);

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgWidth = usableWidth;
    const imgHeight = (canvasHeight * imgWidth) / canvasWidth;

    const pageHeightInPx = (usableHeight * canvasHeight) / imgHeight;

    let positionY = 0;
    let pageNumber = 1;

    while (positionY < canvasHeight) {
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvasWidth;
      pageCanvas.height = Math.min(pageHeightInPx, canvasHeight - positionY);

      const ctx = pageCanvas.getContext('2d')!;
      ctx.drawImage(
        canvas,
        0,
        positionY,
        canvasWidth,
        pageCanvas.height,
        0,
        0,
        canvasWidth,
        pageCanvas.height
      );

      const pageImgData = pageCanvas.toDataURL('image/png');
      if (pageNumber > 1) pdf.addPage();

      // Header & Footer
     // this.addHeaderFooter(pdf, pageNumber, pdfWidth, pdfHeight, headerHeight, footerHeight);

      // Add border line rectangle for margin
      pdf.setDrawColor(0, 0, 0); // red border
      pdf.setLineWidth(0.5);
      pdf.rect(margin, headerHeight + margin, usableWidth, usableHeight);

      // Add page content image
      const heightInMm = (pageCanvas.height * imgWidth) / canvasWidth;
      pdf.addImage(pageImgData, 'PNG', margin, headerHeight + margin, imgWidth -2, heightInMm -2);


      positionY += pageHeightInPx;
      pageNumber++;
    }

    pdf.save('invoice.pdf');
  });
}


addWatermark(pdf: jsPDF, pdfWidth: number, pdfHeight: number) {
  pdf.setTextColor(150); // light gray
  pdf.setFontSize(40);
  pdf.setTextColor(200, 200, 200);
  pdf.setFont('helvetica', 'bold');
  pdf.GState({ opacity: 0.0001 }); // semi-transparent

  // Diagonal center
  const watermarkText = "SHASHMITHA CRACKERS";
  const x = pdfWidth / 2;
  const y = pdfHeight / 2;
  pdf.text(watermarkText, x, y, { align: 'center', angle: 45 });
}

addHeaderFooter(
  pdf: jsPDF,
  pageNumber: number,
  pdfWidth: number,
  pdfHeight: number,
  headerHeight: number,
  footerHeight: number
) {
  // Header
  pdf.setFontSize(12);
//   pdf.html(`<div class="header">
//     <h1>SHASHMITHA CRACKERS</h1>
//   </div>`);
// const imgElement = this.logoImg.nativeElement;
//      pdf.addImage(imgElement, 'PNG', 10, 10, 150, 10);
  // Footer
  pdf.setFontSize(10);
  pdf.text(`Page ${pageNumber}`, pdfWidth - 30, pdfHeight - 10);
}


  constructor(private router: Router ,public commonService :CommonService) {}

  ngOnInit(): void {
//     const state = this.router.getCurrentNavigation()?.extras.state as any;
// console.log( state.items)
//     if (state) {
//       this.commonService.items = state.items || [];
//       this.discountPercent = state.discountPercent || 0;
//       this.subtotalAmount = state.subtotalAmount || 0;
//       this.totalDiscountPrice = state.totalDiscountPrice || 0;
//       this.totalAmount = state.totalAmount || 0;
//       this.estimateNo = state.estimateNo || '';
//       this.estimateDate = state.estimateDate || '';
//       this.customerAddress = state.customerAddress || '';
//     } else {
//       // optional: fallback or redirect if no data was passed
//       console.warn('No data found in navigation state');
//     }
  }
}
