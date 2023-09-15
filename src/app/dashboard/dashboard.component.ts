import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  backgroundImageUrl = 'https://c4.wallpaperflare.com/wallpaper/180/788/983/genshin-impact-ganyu-genshin-impact-hd-wallpaper-preview.jpg';
  isRouteA: boolean = false;
  isRouteB: boolean = false;
  isRouteC: boolean = false;
  isRouteD: boolean = false;
  isRouteE: boolean = false;
  isRouteF: boolean = false;
  // ... resto de las propiedades isRouteX ...

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(urlSegments => {
      const currentPath = urlSegments.join('/');
      this.isRouteA = currentPath === 'dashboard';
      this.isRouteB = currentPath === 'multimedia';
      this.isRouteC = currentPath === 'usuarios';
      this.isRouteD = currentPath === 'horarios';
      this.isRouteE = currentPath === 'citas';
      this.isRouteF = currentPath === 'soporte';
    });
  }
}
