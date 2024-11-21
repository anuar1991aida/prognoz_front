import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgitemComponent } from './orgitem.component';

describe('OrgitemComponent', () => {
  let component: OrgitemComponent;
  let fixture: ComponentFixture<OrgitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
