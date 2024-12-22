import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pril6_incsComponent } from './pril6incs.component';

describe('PkfoComponent', () => {
  let component: Pril6_incsComponent;
  let fixture: ComponentFixture<Pril6_incsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pril6_incsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pril6_incsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
