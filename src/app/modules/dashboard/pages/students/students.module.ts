import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    StudentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    SharedModule
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
