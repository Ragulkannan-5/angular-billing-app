import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
interface ProductRow {
  productName: string;
  quantity: number;
  price: number;
  total: number;
  discountPrice: number;
}
export interface BillDetails {
  billno?: number;
  clientname: string;
  phoneno?: string;
  address: string;
  billstatus: string;
  billcreatedate?: Date;
  lastupdatedate?: Date;
  billjson?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  items: any[] = [];
  config:any;
  clientname = '';
  clientphoneno? = '';
  clientAddress = '';

  estimateNo? : number =0 ;
  estimateDate? :any = '';
  //discountPercent = 0;
  //subtotalAmount = 0;
  //totalDiscountPrice = 0;
 // totalAmount = 0;

  
  constructor(private http: HttpClient) { }
  collapsed = signal(true);

  sideNavWith = computed(() => this.collapsed() ? '65px' : '250px')
    ngOnInit(): void {
     this.http.get<any[]>('jsonfile/config.json').subscribe(data => {
      this.config = data;
    });
  }

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
    addRow() {
    this.rows.push({ productName: '', quantity: 1, price: 0, total: 0, discountPrice: 0 });
  }
 baseUrl = 'http://localhost:7200/'; 
   getAllBills(): Observable<BillDetails[]> {
    return this.http.get<BillDetails[]>(this.baseUrl+"BillDetails/GetBilllist");
  }

  getBill(billNo: number): Observable<BillDetails> {
    return this.http.get<BillDetails>(`${this.baseUrl}BillDetails//${billNo}`);
  }

  addBill(bill: BillDetails): Observable<number> {
    return this.http.post<number>(this.baseUrl+"BillDetails/AddBilllist", bill);
  }

  updateBill(bill: BillDetails): Observable<any> {
    return this.http.put(`${this.baseUrl}BillDetails/EditBilllist/${bill.billno}`, bill);
  }

  deleteBill(billNo: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}BillDetails/DeleteBilllist/${billNo}`);
  }

   SaveBill(bill: BillDetails): Observable<any> {
    return this.http.post(`${this.baseUrl}BillDetails/SaveBill`, bill);
  }

}
