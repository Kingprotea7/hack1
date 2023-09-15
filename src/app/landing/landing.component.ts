import { Component } from '@angular/core';
import { fadeAnimation } from '../landing/animation'; 
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [fadeAnimation]
})
export class LandingComponent {
  }

