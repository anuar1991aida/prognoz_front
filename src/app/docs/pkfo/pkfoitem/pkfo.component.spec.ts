import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PkfoComponent } from './pkfo.component';

describe('PkfoComponent', () => {
  let component: PkfoComponent;
  let fixture: ComponentFixture<PkfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PkfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PkfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
