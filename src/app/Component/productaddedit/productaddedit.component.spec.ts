import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductaddeditComponent } from './productaddedit.component';

describe('ProductaddeditComponent', () => {
  let component: ProductaddeditComponent;
  let fixture: ComponentFixture<ProductaddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductaddeditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
