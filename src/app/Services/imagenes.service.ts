import { Injectable, EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  imagenSeleccionada = new EventEmitter<string>();
  constructor() { }
}
