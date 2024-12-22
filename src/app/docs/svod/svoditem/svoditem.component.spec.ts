import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvodItemComponent } from './svoditem.component';

describe('SvodItemComponent', () => {
  let component: SvodItemComponent;
  let fixture: ComponentFixture<SvodItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvodItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvodItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
