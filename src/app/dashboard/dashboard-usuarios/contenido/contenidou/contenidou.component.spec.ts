import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidouComponent } from './contenidou.component';

describe('ContenidouComponent', () => {
  let component: ContenidouComponent;
  let fixture: ComponentFixture<ContenidouComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenidouComponent]
    });
    fixture = TestBed.createComponent(ContenidouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
