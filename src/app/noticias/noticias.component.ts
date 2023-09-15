import { Component, OnInit } from '@angular/core';
import { getStorage, ref, listAll } from 'firebase/storage';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  pdfUrls: Observable<string[]>;
  pdfIconUrl: string = 'URL_DE_TU_ICONO_PDF';

  constructor() {
    // Inicializa el arreglo pdfUrls con los nombres de los archivos en tu almacenamiento de Firebase
    this.pdfUrls = this.getPDFUrls();
  }

  ngOnInit(): void {
  }

  getPDFUrls(): Observable<string[]> {
    // Cambia 'tu-carpeta' por la ruta de la carpeta en tu almacenamiento de Firebase donde están los archivos PDF
    const folderPath = 'noticias';

    // Obtiene la referencia al almacenamiento de Firebase
    const storage = getStorage();

    // Obtiene la lista de nombres de archivos en la carpeta
    const storageRef = ref(storage, folderPath);

    return from(listAll(storageRef)).pipe(
      map(result => result.items.map(item => item.name))
    );
  }
}
