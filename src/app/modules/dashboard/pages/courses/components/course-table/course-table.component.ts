import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';

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

}
