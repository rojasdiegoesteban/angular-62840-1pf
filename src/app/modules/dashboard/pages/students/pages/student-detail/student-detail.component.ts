import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  
  templateUrl: './student-detail.component.html',
  styles: ``
})
export class StudentDetailComponent {

  studentId: String;
  fullName: String;

  constructor(private activatedRoute: ActivatedRoute) {
    console.log(this.activatedRoute);
    this.studentId = this.activatedRoute.snapshot.params['id'];
    const name = this.activatedRoute.snapshot.queryParams['name'];
    const lastName = this.activatedRoute.snapshot.queryParams['lastName'];
    this.fullName = `${name} ${lastName}`;
  }

}
