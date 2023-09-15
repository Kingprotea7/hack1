import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosComponent } from './contenidos.component';

describe('ContenidosComponent', () => {
  let component: ContenidosComponent;
  let fixture: ComponentFixture<ContenidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenidosComponent]
    });
    fixture = TestBed.createComponent(ContenidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
