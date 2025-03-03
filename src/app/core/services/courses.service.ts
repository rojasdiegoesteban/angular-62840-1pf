import { Injectable } from '@angular/core';
import { concatMap, delay, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Course } from '../../modules/dashboard/pages/courses/models';

/* let MY_FAKE_DATABASE: Course[] = [
  {
    id: generateRandomString(6),
    name: 'Angular',
  },
  {
    id: generateRandomString(6),
    name: 'React',
  },
  {
    id: generateRandomString(6),
    name: 'Vue',
  }
] */


@Injectable({ providedIn: 'root' })
export class CourseService {

  constructor(private httpClient: HttpClient) { }


  getCourses(): Observable<Course[]> {
    //return of([...MY_FAKE_DATABASE]).pipe(delay(300));
    return this.httpClient.get<Course[]>(`${environment.baseApiUrl}/courses`);
  }

  deleteCourseById(id: string): Observable<Course[]> {
    //MY_FAKE_DATABASE = MY_FAKE_DATABASE.filter((course) => course.id != id);
    //return this.getCourses();

    // Paso 1: Elimina el curso
    return (
      this.httpClient
        .delete<Course>(`${environment.baseApiUrl}/courses/${id}`)
        // Paso 2: Consulta nuevamente el listado de cursos
        .pipe(concatMap(() => this.getCourses()))
    );
  }

  addCourse(payload: { name: string }): Observable<Course[]> {
    /* MY_FAKE_DATABASE.push({
      ...payload,
      id: generateRandomString(6),
    });
    return this.getCourses(); */

    // Paso 1: Crea el curso
    return (
      this.httpClient.post<Course>(`${environment.baseApiUrl}/courses`, payload)
        // Paso 2: Vuelve a consultar el listado completo de cursos
        .pipe(concatMap(() => this.getCourses()))
    );
  }

  updateCourseById(id: string, data: { name: string }): Observable<Course[]> {
    /* MY_FAKE_DATABASE = MY_FAKE_DATABASE.map((course) =>
      course.id === id ? { ...course, ...data } : course
    );
    return this.getCourses(); */

    // Paso 1: Actualiza el curso 
   return (
    this.httpClient.patch<Course>(`${environment.baseApiUrl}/courses/${id}`, data)
    // Paso 2: Vuelve a consultar el listado completo de cursos
     .pipe(concatMap(() => this.getCourses()))
    );
  }

  getCourseDetail(id: string): Observable<Course> {
    return this.httpClient.get<Course>(
      `${environment.baseApiUrl}/courses/${id}?_embed=teachers`
    );
  }
 
}