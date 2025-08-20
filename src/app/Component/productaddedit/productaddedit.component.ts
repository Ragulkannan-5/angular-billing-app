import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-productaddedit',
  templateUrl: './productaddedit.component.html',
  styleUrl: './productaddedit.component.scss'
})
export class ProductaddeditComponent {
 productForm: FormGroup;
  isEdit: boolean = false;
categories: string[] = ['BOOM', 'SPARKLERS', 'ROCKETS', 'FLOWERS'];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductaddeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
      this.dialogRef.close(this.productForm.value);
    }
  }

  close() {
    this.dialogRef.close(null);
  }
}
