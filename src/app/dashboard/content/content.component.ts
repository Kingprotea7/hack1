import { Component } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL, listAll } from '@angular/fire/storage';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  imagenURL: string | null = null;
  imagenesURLs: string[] = [];
  paginaActual: number = 1;
  selectedImageUrl: string | null = null;
  imagenModalURL: string | null = null;

  constructor(private storage: Storage) {}
usarImagen(url:string){}
eliminarImagen(url:string){}
  abrirModal(url: string) {
    this.imagenModalURL = url;
  }

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
  }

  async ngOnInit() {
    await this.cargarImagenes();
  }

  calcularPaginaActual(index: number): number {
    return Math.floor(index / 6) + 1;
  }

  calcularNumerosPaginacion(): number[] {
    const cantidadPaginas = Math.ceil(this.imagenesURLs.length / 6);
    return Array.from({ length: cantidadPaginas }, (_, index) => index + 1);
  }

  async cargarImagenes() {
    const listaArchivos = await listAll(ref(this.storage, 'images'));
    this.imagenesURLs = [];

    for (const archivoRef of listaArchivos.items) {
      const url = await getDownloadURL(archivoRef);
      this.imagenesURLs.push(url);
    }
  }

  async subirImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const referencia = ref(this.storage, `images/${file.name}`);

      try {
        await uploadBytes(referencia, file);
        const url = await getDownloadURL(referencia);
        this.imagenURL = url;
        this.cargarImagenes();
      } catch (error) {
        console.log(error);
        this.imagenURL = null;
      }
    }
  }
}
