import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilldetailspageComponent } from './billdetailspage.component';

describe('BilldetailspageComponent', () => {
  let component: BilldetailspageComponent;
  let fixture: ComponentFixture<BilldetailspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BilldetailspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilldetailspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
