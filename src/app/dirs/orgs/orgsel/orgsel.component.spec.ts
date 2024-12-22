import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgselComponent } from './orgsel.component';

describe('OrgselComponent', () => {
  let component: OrgselComponent;
  let fixture: ComponentFixture<OrgselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
