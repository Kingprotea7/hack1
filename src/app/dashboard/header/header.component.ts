import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isSidebarOpen = false;


  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
