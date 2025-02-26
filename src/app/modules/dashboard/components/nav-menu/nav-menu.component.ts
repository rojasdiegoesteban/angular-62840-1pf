import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

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
    },
    {
      label: 'Usuarios',
      routerLink: 'users',
      icon: 'people'
    }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

}
