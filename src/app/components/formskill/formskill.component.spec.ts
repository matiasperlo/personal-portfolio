import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormskillComponent } from './formskill.component';

describe('FormskillComponent', () => {
  let component: FormskillComponent;
  let fixture: ComponentFixture<FormskillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormskillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
