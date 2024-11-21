import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PkfolistComponent } from './pkfolist.component';

describe('PkfolistComponent', () => {
  let component: PkfolistComponent;
  let fixture: ComponentFixture<PkfolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PkfolistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PkfolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
