import { Component, OnInit } from '@angular/core';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-valores',
  templateUrl: './valores.component.html',
  styleUrls: ['./valores.component.css']
})
export class ValoresComponent implements OnInit {
  constructor(private storage: Storage) {}

  valor1: string = "";
  valor2: string = "";
  valor3: string = "";
  valor4: string = "";
  valor5: string = "";
  valor6: string = "";

  ngOnInit() {
    // Obtén las URLs de las imágenes desde Firebase Storage y asígnalas a las variables
    this.getImageUrl('gs://colegiolqn.appspot.com/valores/confianza-01.jpg').then(url => {
      this.valor1 = url;
    });

    this.getImageUrl('gs://colegiolqn.appspot.com/valores/equidad-01.jpg').then(url => {
      this.valor2 = url;
    });

    this.getImageUrl('gs://colegiolqn.appspot.com/valores/honestidad-01.jpg').then(url => {
      this.valor3 = url;
    });

    this.getImageUrl('gs://colegiolqn.appspot.com/valores/honradez-01.jpg').then(url => {
      this.valor4 = url;
    });

    this.getImageUrl('gs://colegiolqn.appspot.com/valores/respeto-01.jpg').then(url => {
      this.valor5 = url;
    });

    this.getImageUrl('gs://colegiolqn.appspot.com/valores/responsabilida-01.jpg').then(url => {
      this.valor6 = url;
    });
  }

  async getImageUrl(imagePath: string): Promise<string> {
    const storageRef = ref(this.storage, imagePath);
    try {
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error obteniendo la URL de la imagen:', error);
      return ''; // Devuelve una cadena vacía en caso de error
    }
  }
}
