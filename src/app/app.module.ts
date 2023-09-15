import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarruselPortadaComponent } from './carrusel-portada/carrusel-portada.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoticiasComponent } from './noticias/noticias.component';
import { MicolegioComponent } from './micolegio/micolegio.component';
import { ValoresComponent } from './valores/valores.component';
import { MapaComponent } from './mapa/mapa.component';
import { FooterComponent } from './footer/footer.component';
import { RedesComponent } from './redes/redes.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DasboardMultimediaComponent } from './dashboard/dashboard-multimedia/dasboard-multimedia.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { ContentComponent } from './dashboard/content/content.component';
import { UsuariosComponent } from './dashboard/dashboard-usuarios/usuarios/usuarios.component';
import { HorariosComponent } from './dashboard/dashboard-horarios/horarios/horarios.component';
import { CitasComponent } from './dashboard/dashboard-citas/citas/citas.component';
import { SoporteComponent } from './dashboard/dashboard-soporte/soporte/soporte.component';
import { AppLogoComponent } from './dashboard/app-logo/app-logo.component';
import { ContenidomComponent } from './dashboard/dashboard-multimedia/Contenido/contenidom/contenidom.component';
import { ContenidouComponent } from './dashboard/dashboard-usuarios/contenido/contenidou/contenidou.component';
import { ContenidohComponent } from './dashboard/dashboard-horarios/contenido/contenidoh/contenidoh.component';
import { ContenidocComponent } from './dashboard/dashboard-citas/contenido/contenidoc/contenidoc.component';
import { ContenidosComponent } from './dashboard/dashboard-soporte/contenido/contenidos/contenidos.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NewsFormComponent } from './dashboard/dashboard-horarios/news-form/news-form.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFunctions,getFunctions } from '@angular/fire/functions';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'multimedia', component: DashboardComponent },
  { path: 'usuarios', component: DashboardComponent},
  { path: 'horarios', component: DashboardComponent },
  { path: 'citas', component: DashboardComponent },
  { path: 'soporte', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,CarruselPortadaComponent, NoticiasComponent, MicolegioComponent, ValoresComponent, MapaComponent, FooterComponent, RedesComponent, LandingComponent, RegisterModalComponent, LoginComponent, RegistroComponent, DashboardComponent, DasboardMultimediaComponent, HeaderComponent, SidebarComponent, ContentComponent, UsuariosComponent, HorariosComponent, CitasComponent, SoporteComponent, AppLogoComponent, ContenidomComponent, ContenidouComponent, ContenidohComponent, ContenidocComponent, ContenidosComponent, NewsFormComponent,
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule, provideFirestore(() => getFirestore()),
    NgbModule,NgbCollapseModule,
    FormsModule,HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    NgxExtendedPdfViewerModule,
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => getFunctions())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
