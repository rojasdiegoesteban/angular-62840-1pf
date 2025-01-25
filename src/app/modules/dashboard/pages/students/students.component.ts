import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';
import { generateRandomString } from '../../../../shared/utils';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  studentForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  students: Student[] = [
    {
      id: generateRandomString(6),
      name: 'John',
      lastName: 'Doe'
    }
  ];

  editingStudentId: string | null = null;


  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {

      if (!!this.editingStudentId) {
        //editar
        this.students = this.students.map((student) =>
          student.id === this.editingStudentId
            ? { ...student, ...this.studentForm.value }
            : student);

        this.editingStudentId = null;
      } else {
        //crear
        this.students = [
          ...this.students,
          {
            id: generateRandomString(6),
            ...this.studentForm.value
          }
        ];
        /*this.students.push({
          id: generateRandomString(6),
          ...this.studentForm.value
        }); */
      }

    }

    this.studentForm.reset();

  };

  onDelete(id: string) {
    if (confirm('Esta seguro que desea eliminar el registro?')) {
      this.students = this.students.filter(student => student.id !== id);
    }
  };

  onEdit(student: Student): void {
    console.log('Se va a editar el estudiante', student);

    this.editingStudentId = student.id;

    this.studentForm.patchValue({
      name: student.name,
      lastName: student.lastName
    });



  };

}
