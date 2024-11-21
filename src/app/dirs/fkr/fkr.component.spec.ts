import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FkrComponent } from './fkr.component';

describe('FkrComponent', () => {
  let component: FkrComponent;
  let fixture: ComponentFixture<FkrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FkrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FkrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
