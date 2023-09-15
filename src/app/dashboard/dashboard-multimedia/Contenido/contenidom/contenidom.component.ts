import { Component,ChangeDetectorRef } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from '@angular/fire/storage';

interface ImageInfo {
  url: string;
  showConfirmation: boolean;
}

@Component({
  selector: 'app-contenidom',
  templateUrl: './contenidom.component.html',
  styleUrls: ['./contenidom.component.css'] 
})
export class ContenidomComponent {
  imagenURL: string | null = null;
  imagenes: ImageInfo[] = [];
  modalImageUrl: string | null = null;
  modalImageIndex: number | null = null;
  showConfirmation: boolean[] = [];
  archivos: any[] = [];
  constructor(private storage: Storage,private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    this.cargarArchivos();
    
  }
  async getDownloadLink(archivo: string): Promise<string> {
    const storageRef = ref(this.storage, `carrusel/${archivo}`);
    try {
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error('Error al obtener la URL de descarga:', error);
      return ''; // Otra acción en caso de error, como retornar una URL por defecto o lanzar una excepción
    }
  }
  obtenerURLImagen(archivo: string): Promise<string> {
    const imagenRef = ref(this.storage, `carrusel/${archivo}`);
    return getDownloadURL(imagenRef);
  }
  async cargarArchivos() {
    // Obtener la lista de archivos en la ruta deseada en Firebase Storage
    const storageRef = ref(this.storage, 'carrusel/');
    const fileList = await listAll(storageRef);

    // Extraer los nombres de los archivos
    this.archivos = fileList.items.map(item => item.name);
  }
  
  async borrarArchivo(nombreArchivo: string,event: Event  ) {
    // Construir una referencia al archivo que deseas borrar
    const archivoRef = ref(this.storage, `carrusel/${nombreArchivo}`);
    event.stopPropagation();
    try {
      // Borrar el archivo
      await deleteObject(archivoRef);
      console.log(`Archivo ${nombreArchivo} borrado con éxito.`);
      // Actualizar la lista de archivos después de borrar
      this.cargarArchivos();
    } catch (error) {
      console.error('Error al borrar el archivo:', error);
    }
  }

  async abrirPDF(archivo: string) {
    try {
      const url = await this.getDownloadLink(archivo);
      if (url) {
        // Abre la URL en una nueva pestaña
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Error al abrir el archivo PDF:', error);
    }
  }
  cancelarEliminacion(index: number | null) {
    if (index !== null) {
      this.showConfirmation[index] = false;
      this.modalImageIndex = null;
    }
  }

  mostrarConfirmacion(url: string, index: number | null) {
    if (index !== null) {
      this.modalImageUrl = url;
      this.showConfirmation[index] = true;
      this.modalImageIndex = index;
    }
  }


  async subirImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const referencia = ref(this.storage, `carrusel/${file.name}`);
      try {
        await uploadBytes(referencia, file);
        console.log('Archivo subido con éxito a Firebase Storage.');

        // Agrega el nombre del archivo subido a la lista
        this.archivos.push(file.name);

        // Actualiza la vista de Angular
        this.cdr.detectChanges();
      } catch (error) {
        console.error('Error al subir el archivo:', error);
      }
    }
  }


  calcularNumerosPaginacion(): number[] {
    const cantidadPaginas = Math.ceil(this.imagenes.length / 6);
    return Array.from({ length: cantidadPaginas }, (_, index) => index + 1);
  }

  cambiarPagina(pagina: number) {
    // Lógica para cambiar la página
  }

  //

  
}
