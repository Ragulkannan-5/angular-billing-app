import { Component, OnInit, signal } from '@angular/core';
import { BillDetails, CommonService } from '../../commonservice/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billdetailspage',
  templateUrl: './billdetailspage.component.html',
  styleUrl: './billdetailspage.component.scss'
})
export class BilldetailspageComponent implements OnInit {
  bills: BillDetails[] = [];
  filteredBills: BillDetails[] = [];
  searchText: string = '';
readonly panelOpenState = signal(false);
  constructor(private billService: CommonService,private router: Router) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.billService.getAllBills().subscribe(data => {
      this.bills = data;
      this.filteredBills = data;
    });
  }

  applyFilter() {
    if (!this.searchText) {
      this.filteredBills = this.bills;
    } else {
      this.filteredBills = this.bills.filter(b =>
        b.clientname.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (b.phoneno && b.phoneno.includes(this.searchText))
      );
    }
  }

  addBill() {
    // Open dialog or navigate to add bill page
    console.log("Add Bill clicked");
  }

  editBill(bill: BillDetails) {
    this.billService.clientname = bill.clientname;
    this.billService.clientAddress = bill.address;
    this.billService.clientphoneno = bill.phoneno;
    this.billService.estimateNo = bill.billno;
    this.billService.estimateDate = bill.billcreatedate;
    console.log(JSON.parse( bill.billjson))
    try {
     this.billService.rows = JSON.parse( bill.billjson);  // ✅ Convert to array
    } catch (e) {
      alert("Invalid JSON");
    }
     this.router.navigate(["Billing"], {
      state: {
      }
    });
    // this.billService.rows = bill.billjson;


  }

  deleteBill(bill: BillDetails) {
    if (confirm(`Delete Bill #${bill.billno}?`)) {
      this.billService.deleteBill(bill.billno!).subscribe(() => {
        this.loadBills();
      });
    }
  }
}
