import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingFormComponent } from './building-form.component';

describe('BuildingFormComponent', () => {
  let component: BuildingFormComponent;
  let fixture: ComponentFixture<BuildingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingFormComponent]
    });
    fixture = TestBed.createComponent(BuildingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
