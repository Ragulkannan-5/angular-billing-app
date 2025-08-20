import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlistpageComponent } from './productlistpage.component';

describe('ProductlistpageComponent', () => {
  let component: ProductlistpageComponent;
  let fixture: ComponentFixture<ProductlistpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductlistpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductlistpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
