import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavCollapsed = true;

  constructor(private el: ElementRef, private modalService: NgbModal, private sanitizer: DomSanitizer,config: NgbDropdownConfig ) {

    config.placement = 'bottom-right';
  }

  ngOnInit(): void {
    // Agregar un evento de clic en el elemento raíz del documento
    document.addEventListener('click', (event) => {
      // Verificar si el clic fue fuera del botón y de la barra de navegación
      if (!this.el.nativeElement.contains(event.target) && !this.isNavCollapsed) {
        this.closeNavbar(); // Cierra la barra de navegación
      }
    });
  }

  toggleNavbar() {
    this.isNavCollapsed = !this.isNavCollapsed;
  }

  closeNavbar() {
    this.isNavCollapsed = true; // Cierra la barra de navegación
  }

  openRegisterModal() {
    // Abre la ventana modal
    this.modalService.open(RegisterModalComponent, {
      centered: true
    }); // O ajustar otras opciones según sea necesario
  }

  // Función para sanitizar y retornar HTML seguro
  sanitizeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
