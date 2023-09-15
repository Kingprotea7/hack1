import { Component } from '@angular/core';
import { RegistroService } from '../Services/registro-services.service';
import { Router } from '@angular/router'; // Importa Router
import { fadeAnimation } from '../landing/animation'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  animations: [fadeAnimation]
})
export class RegistroComponent {
  nombre="";
  correo="";
  contrasena="";
  constructor(private registroS:RegistroService , private router: Router){
  }
registrar():void{
  this.registroS.guardarRegistro(this.nombre,this.contrasena,this.correo);
  console.log("Se envio la peticion los registros");
}


}
