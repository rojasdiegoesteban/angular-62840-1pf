import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';
import { AuthService } from '../../../../../../core/services/auth.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-course-table',
  standalone: false,
  
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss'
})
export class CourseTableComponent {
  
  @Input()
  dataSource: Course[] = [];

  @Output()
  delete = new EventEmitter<string>();

  @Output()
  edit = new EventEmitter<Course>();

  displayedColumns = ['id', 'name', 'actions'];

  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$;
  }

}
