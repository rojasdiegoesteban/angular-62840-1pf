import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';
import { generateRandomString } from '../../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  constructor(private dialog: MatDialog, private fb: FormBuilder) { }


  displayedColumns: string[] = ['id', 'name', 'actions'];
  students: Student[] = [
    {
      id: generateRandomString(6),
      name: 'John',
      lastName: 'Doe'
    }
  ];

  editingStudentId: string | null = null;


  onDelete(id: string) {
    if (confirm('Esta seguro que desea eliminar el registro?')) {
      this.students = this.students.filter(student => student.id !== id);
    }
  };

  onEdit(student: Student): void {
    this.editingStudentId = student.id;

    this.dialog.open(StudentDialogFormComponent, {
      data: student
    }).afterClosed().subscribe({
      next: (valorFormulario) => {
        if (!!valorFormulario) {
          //Editar
          this.students = this.students.map((student) =>
            student.id === this.editingStudentId
              ? { ...student, ...valorFormulario }
              : student
          );
          this.editingStudentId = null;
        }
      }
    });
  }


  onCreateStudent(): void {
    this.dialog.open(StudentDialogFormComponent).afterClosed().subscribe({
      next: (valorFormulario) => {
        if (!!valorFormulario) {
          //Crear
          this.students = [
            ...this.students,
            {
              id: generateRandomString(6),
              ...valorFormulario
            }
          ]
        }
      }
    });
  }

}
