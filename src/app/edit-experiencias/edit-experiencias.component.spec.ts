import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExperienciasComponent } from './edit-experiencias.component';

describe('EditExperienciasComponent', () => {
  let component: EditExperienciasComponent;
  let fixture: ComponentFixture<EditExperienciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExperienciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExperienciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
