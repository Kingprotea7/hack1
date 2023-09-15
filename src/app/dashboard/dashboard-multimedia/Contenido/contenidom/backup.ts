import { Component } from '@angular/core';
import { Storage, getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from '@angular/fire/storage';

@Component({
  selector: 'app-contenidom',
  templateUrl: './contenidom.component.html',
  styleUrls: ['./contenidom.component.css']
})


export class ContenidomComponent {
  imagenURL: string | null = null;
  imagenesURLs: string[] = [];
  paginaActual: number = 1;
  selectedImageUrl: string | null = null;
  imagenModalURL: string | null = null;
  storage1 = getStorage(); 
  modalImageUrl: string | null = null;
  modalImageIndex: number | null = null;
  showConfirmation: boolean[] = [];// Agregar esta línea
  mostrarConfirmacion(url: string, index: number) {
    this.modalImageUrl = url;
    this.showConfirmation[index] = true;
    this.modalImageIndex = index; // Almacenar el índice
  }
  constructor(private storage: Storage) {}

eliminarImagen(url: string | null, index: number) {
  try {
    if (url) {
      const nombreArchivo = this.obtenerNombreArchivoDesdeUrl(url);
      if (nombreArchivo) {
        console.log("URL a eliminar:", url);
        const imagenRef = ref(this.storage1, nombreArchivo);
        console.log('Referencia de imagen a eliminar:', imagenRef);
        deleteObject(imagenRef)
          .then(() => {
            console.log('Imagen eliminada correctamente');
            this.imagenesURLs.splice(index, 1);
            this.showConfirmation[index] = false;
            this.modalImageUrl = null;
          })
          .catch((error) => {
            console.error('Error al eliminar la imagen: 1', error);
          });
      }
    }
  } catch (error) {
    console.error('Segundo catch,Error al eliminar la imagen:', error);
  }
}


  
  
  
  
cancelarEliminacion(index: number | null) {
  if (index !== null) {
    this.showConfirmation[index] = false;
    this.modalImageUrl = null;
    this.modalImageIndex = null;
  }
}

  


 
  obtenerNombreArchivoDesdeUrl(url: string): string {
    const urlPartes = url.split('/');
    return urlPartes[urlPartes.length - 1];
  }
  

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
    const listaArchivos = await listAll(ref(this.storage, 'carrusel'));
    this.imagenesURLs = [];

    for (const archivoRef of listaArchivos.items) {
      const url = await getDownloadURL(archivoRef);
      this.imagenesURLs.push(url);
    }
  }

  async subirImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const referencia = ref(this.storage, `carrusel/${file.name}`);

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
