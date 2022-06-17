import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseEditComponent } from './lease-edit.component';

describe('LeaseEditComponent', () => {
  let component: LeaseEditComponent;
  let fixture: ComponentFixture<LeaseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaseEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
