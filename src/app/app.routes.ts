import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'sobre-mi',
    loadComponent: () => import('./pages/sobre-mi/sobre-mi').then(m => m.SobreMi)
  },
  {
    path: 'proyectos',
    loadComponent: () => import('./pages/proyectos/proyectos').then(m => m.Proyectos)
  },
  {
    path: 'proyectos/nuevo',
    loadComponent: () => import('./pages/nuevo-proyecto/nuevo-proyecto').then(m => m.NuevoProyecto)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
