import { TestBed } from '@angular/core/testing';

import { SeleccionImagenService } from './seleccion-imagen.service';

describe('SeleccionImagenService', () => {
  let service: SeleccionImagenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeleccionImagenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
