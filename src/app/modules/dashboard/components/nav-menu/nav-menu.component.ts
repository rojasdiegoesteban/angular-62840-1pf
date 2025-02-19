import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  
  templateUrl: './nav-menu.component.html',
  styles: ``
})
export class NavMenuComponent {

  linkItems: { label: string, routerLink: string, icon: string }[] = [
    {
      label: 'Inicio',
      routerLink: 'home',
      icon: 'home'
    },
    {
      label: 'Estudiantes',
      routerLink: 'students',
      icon: 'person'
    },
    {
      label: 'Cursos',
      routerLink: 'courses',
      icon: 'book'
    }
  ];

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }

}
