import { ref, Storage,listAll ,getDownloadURL} from '@angular/fire/storage';
import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, query, where, onSnapshot } from "firebase/firestore";

@Component({
  selector: 'app-carrusel-portada',
  templateUrl: './carrusel-portada.component.html',
  styleUrls: ['./carrusel-portada.component.css']
})
export class CarruselPortadaComponent implements OnInit {
  imageUrls: any = [];
  storage:any;
  constructor(storage:Storage) {
    this.storage=storage;
    this.imageUrls=[];
   }
  getImages(){
  const imagRef=ref(this.storage,'carrusel');
  listAll(imagRef).then(async response=>{
    console.log(response);
    this.imageUrls=[];
    for(let item of response.items){
      const url=await getDownloadURL(item);
      this.imageUrls.push(url);

    }
  })
  .catch(error=>{
    console.log(error);
  }); 
  }
  

  ngOnInit(): void {
   
    this.getImages();


}

}