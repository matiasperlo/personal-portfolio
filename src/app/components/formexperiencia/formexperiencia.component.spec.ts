import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormexperienciaComponent } from './formexperiencia.component';

describe('FormexperienciaComponent', () => {
  let component: FormexperienciaComponent;
  let fixture: ComponentFixture<FormexperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormexperienciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormexperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
