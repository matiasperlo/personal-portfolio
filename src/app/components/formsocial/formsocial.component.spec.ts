import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsocialComponent } from './formsocial.component';

describe('FormsocialComponent', () => {
  let component: FormsocialComponent;
  let fixture: ComponentFixture<FormsocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
