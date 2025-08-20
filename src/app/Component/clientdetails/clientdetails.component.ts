import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../commonservice/common.service';

@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrl: './clientdetails.component.scss'
})
export class ClientdetailsComponent {
 clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClientdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public commonService :CommonService
  ) {
    this.clientForm = this.fb.group({
      username: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      // estimateNo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)]],
      estimateDate: [new Date(), Validators.required]
    });
   if( this.commonService.clientname){
          const clientData = {
        username: this.commonService.clientname ,
        address: this.commonService.clientAddress,
        phone: this.commonService.clientphoneno,
        estimateNo: this.commonService.estimateNo,
        estimateDate: this.commonService.estimateDate
      };
      // Bind the values to the form
      this.clientForm.patchValue(clientData);
      }
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    }
  }

  save(){
    if (this.clientForm.valid) {
      const formValues = this.clientForm.value;
      this.commonService.clientname = formValues.username
      this.commonService.clientAddress = formValues.address
      this.commonService.clientphoneno = formValues.phone
      this.commonService.estimateNo = formValues.estimateNo
      this.commonService.estimateDate = formValues.estimateDate

      this.dialogRef.close(this.clientForm.value);
      
    }

  }
}
