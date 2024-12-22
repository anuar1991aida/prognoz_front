import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pril6Component } from './pril6activs.component';

describe('PkfoComponent', () => {
  let component: Pril6Component;
  let fixture: ComponentFixture<Pril6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pril6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pril6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
