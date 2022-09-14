import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormproyectoComponent } from './formproyecto.component';

describe('FormproyectoComponent', () => {
  let component: FormproyectoComponent;
  let fixture: ComponentFixture<FormproyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormproyectoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
