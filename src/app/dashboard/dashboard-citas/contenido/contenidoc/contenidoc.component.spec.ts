import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidocComponent } from './contenidoc.component';

describe('ContenidocComponent', () => {
  let component: ContenidocComponent;
  let fixture: ComponentFixture<ContenidocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenidocComponent]
    });
    fixture = TestBed.createComponent(ContenidocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
