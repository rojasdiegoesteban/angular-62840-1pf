import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';

/*
* Aqui partimos de la ruta base "/dashboard/students"
*/

const routes: Routes = [
  {
    path: "",
    component: StudentsComponent,
  },
  {
    // EL path conformado es /dashboard/students/:id
    path: ':id',
    component: StudentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
