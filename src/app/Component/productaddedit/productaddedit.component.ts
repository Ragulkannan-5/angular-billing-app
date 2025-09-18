import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../commonservice/common.service';

@Component({
  selector: 'app-productaddedit',
  templateUrl: './productaddedit.component.html',
  styleUrl: './productaddedit.component.scss'
})
export class ProductaddeditComponent {
  productForm: FormGroup;
  isEdit: boolean = false;
  apiurl = (window as any).appConfig.apiurl;
  categories: string[] = (window as any).appConfig.category;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductaddeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    public commonService: CommonService
  ) {
    this.isEdit = !!data; // true if editing
    this.productForm = this.fb.group({
      id: [data?.id || 0],
      productName: [data?.productName || '', Validators.required],
      price: [data?.price || 0, Validators.required],
      category: [data?.category || '', Validators.required],
      shortcut: [data?.shortcut || '', Validators.required],
      addStack: [data?.currentstack || 0, Validators.required]
    });
  }

  save() {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value.productName + "not valied");
    }
    var json: any = {
      productNam: this.productForm.value.productName,
      quantity: this.productForm.value.quantity,
      price: this.productForm.value.price,
      total: this.productForm.value.total,
      discountPrice: this.productForm.value.discountPrice,
    }
    let product = {
      id: this.productForm.value.id,
      productName: this.productForm.value.productName,
      price: this.productForm.value.price,
      category: this.productForm.value.category,
      shortcut: this.productForm.value.shortcut,
      addStack: this.productForm.value.addStack,
    };
    if (this.isEdit) {
      this.http.post<any>(this.apiurl + "Productlist/Editproduct", product).subscribe({
        next: (res) => {
          console.log("API Response:", res);   // ✅ Logs full response
        },
        error: (err) => {
          console.error("API Error:", err);    // ✅ Logs error if request fails
        },
        complete: () => {
          console.log("Request Completed");    // ✅ Logs when request is done
        }
      });
      this.dialogRef.close(this.productForm.value.productName + " successfully edited");
    }
    else {
      this.http.post<any>(this.apiurl + "Productlist/Addproduct", product).subscribe({
        next: (res) => {
          console.log("API Response:", res);   // ✅ Logs full response
        },
        error: (err) => {
          console.error("API Error:", err);    // ✅ Logs error if request fails
        },
        complete: () => {
          console.log("Request Completed");    // ✅ Logs when request is done
        }
      });
      this.dialogRef.close(this.productForm.value.productName + " successfully added");
    }
  }

  close() {
    this.dialogRef.close(null);
  }
}
