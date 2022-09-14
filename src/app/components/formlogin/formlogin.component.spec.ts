import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormloginComponent } from './formlogin.component';

describe('FormloginComponent', () => {
  let component: FormloginComponent;
  let fixture: ComponentFixture<FormloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
