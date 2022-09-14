import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeducacionComponent } from './formeducacion.component';

describe('FormeducacionComponent', () => {
  let component: FormeducacionComponent;
  let fixture: ComponentFixture<FormeducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormeducacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormeducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
