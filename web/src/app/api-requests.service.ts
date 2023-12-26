import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Activit1 } from './activities-display/activities-display.component';

export interface ActivityType{
  id: number;
  name: string;
  number_monitors: string;
}

export interface Teacher{
  id: number;
  name: string;
  email: string;
  phone: string;
  photo: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  constructor(private http: HttpClient) { }

  getTeachersByApi(): Observable<Teacher[]> {
    return this.http.get<any[]>('//127.0.0.1:8000/monitors').pipe(
      map(data => data.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        photo: item.photo
      }))),
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Error fetching teachers'));
      })
    );
  }

  getActivityTypesByApi(): Observable<ActivityType[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/activity-types').pipe(
      map(data => data.map(item => ({
        id: item.id,
        name: item.name,
        number_monitors: item.number_monitors
      }))),
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Error fetching activity types'));
      })
    );
  }
  getActivitiesByApi(): Observable<Activit1[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/activities').pipe(
      map(data => data.map(item => ({
        id: item.id,
        activity_type: item.activity_type,
        monitors: item.monitors,
        date_start: item.date_start,
        date_end: item.date_end
      }))),
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Error fetching activities'));
      })
    );
  }
  

  subject: ReplaySubject<any> = new ReplaySubject();
  obs: Observable<any> = this.subject.asObservable();

  notify = (data: any) => {
    this.subject.next(data)
  }
}
