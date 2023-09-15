import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidohComponent } from './contenidoh.component';

describe('ContenidohComponent', () => {
  let component: ContenidohComponent;
  let fixture: ComponentFixture<ContenidohComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenidohComponent]
    });
    fixture = TestBed.createComponent(ContenidohComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
