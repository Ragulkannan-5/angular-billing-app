import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewpdfComponent } from './previewpdf.component';

describe('PreviewpdfComponent', () => {
  let component: PreviewpdfComponent;
  let fixture: ComponentFixture<PreviewpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewpdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
