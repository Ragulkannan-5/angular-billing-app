import { Injectable } from '@angular/core';
interface ProductRow {
  productName: string;
  quantity: number;
  price: number;
  total: number;
  discountPrice: number;
}
@Injectable({
  providedIn: 'root'
})
export class CommonService {
 items: any[] = [];
  //discountPercent = 0;
  //subtotalAmount = 0;
  //totalDiscountPrice = 0;
 // totalAmount = 0;
  estimateNo = '';
  estimateDate = '';
  customerAddress = '';
  constructor() { }
  rows: ProductRow[] = [
    { productName: '', quantity: 1, price: 0, total: 0, discountPrice: 0 }
  ];

  discountPercent: number = 10; // editable discount %

  get totalDiscountPrice(): number {
    return this.rows.reduce((acc, row) => acc + row.discountPrice, 0);
  }

  get totalAmount(): number {
    
     var subtotal =this.rows.reduce((acc, row) => acc + row.total, 0);
      const discountAmount = (subtotal * this.discountPercent) / 100;
       var discountPrice = parseFloat(discountAmount.toFixed(2));
   return parseFloat((subtotal - discountAmount).toFixed(2));
  }

    get subtotalAmount(): number {
    return this.rows.reduce((acc, row) => acc + row.total, 0);
  }
}
