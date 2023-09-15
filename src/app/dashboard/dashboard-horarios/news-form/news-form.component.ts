import { Component, ViewChild, OnInit ,ChangeDetectorRef } from '@angular/core';
import jsPDF from 'jspdf';
import { finalize } from 'rxjs/operators';
import { Storage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from '@angular/fire/storage';


@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})


export class NewsFormComponent  implements OnInit{
//CARRUSEL PARA MOSTRAR ;D
imagenURL: string | null = null;
  imagenesURLs: string[] = [];
  paginaActual: number = 1;
  selectedImageUrl: string | null = null;
  imagenModalURL: string | null = null;
usarImagen(url:string){}
eliminarImagen(url:string){}
  abrirModal(url: string) {
    this.imagenModalURL = url;
  }

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
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



//
  archivos: any[] = [];
  async ngOnInit() {
    this.cargarArchivos();
    await this.cargarImagenes();
  }
   pdfFile: File | null = null;
  onPdfFileSelected(event: any) {
    this.pdfFile = event?.target?.files[0];
  }
  @ViewChild('newsForm', { static: false }) newsForm: any;

  constructor(private storage: Storage,private cdr: ChangeDetectorRef) {}
  news = {
    title: '',
    content: '',
    date: '',
    imageUrl: '' // Aquí almacenarás la imagen en formato base64
  };

  onImageChange(event: any) {
    const file = event?.target?.files[0]; // Usa el operador de navegación segura '?'
  
    if (file) {
      this.toBase64(file, (base64Image) => {
        this.news.imageUrl = base64Image;
      });
    }
  }
  async subirImagen1(event: any) {
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

  // Convierte una imagen en base64
  toBase64(file: File, callback: (base64: string) => void) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e?.target?.result as string;
      if (result) {
        callback(result);
      }
    };
    reader.readAsDataURL(file);
  }
  generatePDF() {
    const pdf = new jsPDF('p', 'mm', 'a4'); // Establece el tamaño de página a A4
  
    // Obtén los datos del formulario
    const title = this.news.title;
    const content = this.news.content;
    const date = this.news.date;
  
    // Establece el margen inferior para dejar espacio para el número de página
    const marginBottom = 20;
  
    let currentPageHeight = 0;
  
    // Función para verificar si se debe agregar una nueva página
    function checkPageBreak(heightNeeded: number) {
      if (pdf.internal.pageSize.height - currentPageHeight < heightNeeded + marginBottom) {
        pdf.addPage(); // Agrega una nueva página
        currentPageHeight = 0;
      }
    }
  
    // Verifica si hay una imagen seleccionada y colócala en la parte superior
    if (this.news.imageUrl) {
      const imgData = this.news.imageUrl;
  
      // Ajusta las dimensiones de la imagen
      const imgWidth = 120; // Ancho de la imagen (ajustado)
      const imgHeight = 90; // Altura de la imagen
  
      // Centra la imagen horizontalmente
      const imgX = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
  
      checkPageBreak(imgHeight + marginBottom); // Verifica si es necesario agregar una nueva página
      pdf.addImage(imgData, 'JPEG', imgX, currentPageHeight + 10, imgWidth, imgHeight); // Coloca la imagen centrada
      currentPageHeight += imgHeight + 10; // Actualiza la altura actual
  
      // Ajusta el título para que haga un salto de línea cuando llegue al borde de la hoja
      const titleLines = pdf.splitTextToSize(title, 180); // 180 es el ancho de la página, ajusta según tus necesidades
      checkPageBreak(titleLines.length * 10 + marginBottom); // Verifica si es necesario agregar una nueva página
      pdf.text(titleLines, 10, currentPageHeight + 10); // Ajusta la posición vertical del título
      currentPageHeight += titleLines.length * 10 + 10; // Actualiza la altura actual
  
      pdf.text(`Fecha: ${date}`, 10, currentPageHeight + 10);   // Coloca la fecha debajo del título
      currentPageHeight += 20; // Actualiza la altura actual
    } else {
      // Ajusta el título para que haga un salto de línea cuando llegue al borde de la hoja
      const titleLines = pdf.splitTextToSize(title, 180); // 180 es el ancho de la página, ajusta según tus necesidades
      checkPageBreak(titleLines.length * 10 + marginBottom); // Verifica si es necesario agregar una nueva página
      pdf.text(titleLines, 10, currentPageHeight + 10); // Ajusta la posición vertical del título sin imagen
      currentPageHeight += titleLines.length * 10 + 10; // Actualiza la altura actual
  
      pdf.text(`Fecha: ${date}`, 10, currentPageHeight + 10);   // Coloca la fecha debajo del título sin imagen
      currentPageHeight += 20; // Actualiza la altura actual
    }
  
    // Divide el contenido en líneas y agrega cada línea al PDF
    const contentLines = pdf.splitTextToSize(content, 180); // 180 es el ancho de la página, ajusta según tus necesidades
    for (const line of contentLines) {
      checkPageBreak(10); // Verifica si es necesario agregar una nueva página para cada línea
      pdf.text(line, 10, currentPageHeight);
      currentPageHeight += 10;
    }
  
    // Guarda o muestra el PDF
    pdf.save('noticia.pdf'); // Guarda el PDF con un nombre de archivo
  
    // Si deseas limpiar el formulario después de generar el PDF, puedes hacerlo aquí
    this.newsForm.reset();

  }
  
  /////FIRESTORAGE DE LOS PDF'S
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
//mostrar previamente pdf

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


}
