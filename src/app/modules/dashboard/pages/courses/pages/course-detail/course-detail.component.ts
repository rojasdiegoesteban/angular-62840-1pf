import { Component } from '@angular/core';
import { CourseService } from '../../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {

  isLoading = false;
  course: Course | null = null;

  errorMessage: string | null = null;

  constructor(private coursesService: CourseService, 
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.coursesService.getCourseDetail(
      this.activateRoute.snapshot.params['id']
    ).subscribe({
      next: (course) => {
        this.course = course;
        this.errorMessage = null;
      },
      complete: () => {
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;

        if(error instanceof HttpErrorResponse) {
          if(error.status === 404) {
            this.errorMessage = 'El curso no existe';
          }
        }
      }
    });
  }

}