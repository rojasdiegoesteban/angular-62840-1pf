import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

/*
* Aqui estamos posicionados en la ruta "/dashboard"
*/

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'students',
    loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule),
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule),
  },
  {
    path: 'users',
    canActivate: [adminGuard],
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
