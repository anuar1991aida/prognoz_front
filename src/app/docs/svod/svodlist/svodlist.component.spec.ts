import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvodlistComponent } from './svodlist.component';

describe('SvodlistComponent', () => {
  let component: SvodlistComponent;
  let fixture: ComponentFixture<SvodlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvodlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvodlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
