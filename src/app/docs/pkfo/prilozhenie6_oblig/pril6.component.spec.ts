import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pril6_obligsComponent } from './pril6obligs.component';

describe('PkfoComponent', () => {
  let component: Pril6_obligsComponent;
  let fixture: ComponentFixture<Pril6_obligsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pril6_obligsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pril6_obligsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
