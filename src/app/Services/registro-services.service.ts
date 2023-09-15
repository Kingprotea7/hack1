import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importa Router

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private baseUrl = 'https://colegiolqn-default-rtdb.firebaseio.com/datos.json'; // URL del backend

  constructor(private http: HttpClient,private router: Router) { }

  guardarRegistro(username: string, password: string, correo: string): void {
    console.log("Datos interpretados")
    const nuevoRegistro = {
      username,
      password,
      correo
      
    };
    console.log("Datos almacenados")

    // Realizar solicitud POST al backend
    this.http.post(this.baseUrl, nuevoRegistro).subscribe(result => {
      console.log("enviado")
      this.router.navigate(['/login']);
      ;
    }, error => console.error(error));
  }
}
