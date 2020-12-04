// Modulos de router
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { Error404Component } from './components/error404/error404.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

// Definir rutas

const appRoutes: Routes = [
  {path: '', component: AboutComponent},
  {path: 'about', component: AboutComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'create-projects', component: CreateComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'project/:id', component: DetailComponent},
  {path: 'edit-project/:id', component: EditComponent},
  {path: '**', component: Error404Component},
];

// Exportar configuracion de las rutas
export const appRoutingProviders: any[] = []; // servicio de rutas
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); // Cargar las rutas en el router de angular
