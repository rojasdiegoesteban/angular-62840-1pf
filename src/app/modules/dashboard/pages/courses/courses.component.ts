import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../core/services/courses.service';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: false,

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  isLoading = false;
  dataSource: Course[] = [];

  isAdmin$: Observable<boolean>;

  constructor(private courseService: CourseService, private matDialog: MatDialog, private authService: AuthService) { 
    this.isAdmin$ = this.authService.isAdmin$;
  }

  handleCoursesUpdate(data: Course[]): void {
    this.dataSource = [...data];
  }

  openFormDialog(editingCourse?: Course): void {
    this.matDialog
      .open(CourseFormDialogComponent, {data: {editingCourse} })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (!!data) {
            if (!!editingCourse) {
              //actualizar
              this.updateCourse(editingCourse.id, data);
            } else {
              //agregar
              this.addCourse(data);
            }
          }
        }
      });
  }

  updateCourse(id: string, data: { name: string }) {
    this.isLoading = true;
    this.courseService.updateCourseById(id, data).subscribe({
      next: (data) => {
        this.handleCoursesUpdate(data);
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  addCourse(data: { name: string }): void {
    this.isLoading = true;
    this.courseService.addCourse(data).subscribe({
      next: (data) => {
        this.handleCoursesUpdate(data);
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.handleCoursesUpdate(data);
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onDelete(id: string): void {
    if (confirm('Esta seguro que desea eliminar el registro?')) {
      this.isLoading = true;
      this.courseService.deleteCourseById(id).subscribe({
        next: (data) => {
          this.handleCoursesUpdate(data);
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

}
