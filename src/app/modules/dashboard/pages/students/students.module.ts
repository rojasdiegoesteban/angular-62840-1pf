import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogFormComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
