import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/profile/profile').then(m => m.Profile)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
