import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicolegioComponent } from './micolegio.component';

describe('MicolegioComponent', () => {
  let component: MicolegioComponent;
  let fixture: ComponentFixture<MicolegioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MicolegioComponent]
    });
    fixture = TestBed.createComponent(MicolegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
