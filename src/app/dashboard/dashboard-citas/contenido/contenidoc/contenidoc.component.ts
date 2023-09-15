import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Storage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from '@angular/fire/storage';
@Component({
  selector: 'app-contenidoc',
  templateUrl: './contenidoc.component.html',
  styleUrls: ['./contenidoc.component.css']
})
export class ContenidocComponent implements OnInit{

 ngOnInit() {
  }

  constructor(private storage: Storage) {}


  


}
