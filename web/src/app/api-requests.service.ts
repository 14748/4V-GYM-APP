import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

export interface Activity {
  id: number;
  activity_type: number;
  monitors: Teacher[];
  date_start: string;
  date_end: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  constructor(private http: HttpClient) { }

  getTeachersByApi(): Observable<Teacher[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/monitors').pipe(
      map(data => data.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        photo: item.photo
      }))),
      catchError((error: HttpErrorResponse) => {
        console.error('Error posting teacher', error);
        return throwError(() => error.error.message);
      })
    );
  }

  subject: ReplaySubject<any> = new ReplaySubject();
  obs: Observable<any> = this.subject.asObservable();

  notify = (data: any) => {
    this.subject.next(data)
  }
  

  getActivityTypesByApi(): Observable<ActivityType[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/activity-types').pipe(
      map(data => data.map(item => ({
        id: item.id,
        name: item.name,
        number_monitors: item.number_monitors
      }))),
      catchError((error: HttpErrorResponse) => {
        console.error('Error posting teacher', error);
        return throwError(() => error.error.message);
      })
    );
  }
  getActivitiesByApi(): Observable<Activity[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/activities').pipe(
      map(data => data.map(item => ({
        id: item.id,
        activity_type: item.activity_type,
        monitors: item.monitors,
        date_start: item.date_start,
        date_end: item.date_end
      }))),
      catchError((error: HttpErrorResponse) => {
        console.error('Error posting teacher', error);
        return throwError(() => error.error.message);
      })
    );
  }

  createActivity(activityData: Omit<Activity, 'id'>): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/activities', activityData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error posting teacher', error);
        return throwError(() => error.error.message);
      })
    );
  }

  deleteActivity(id: number): Observable<any> {
    const url = `http://127.0.0.1:8000/activities/${id}`;
    return this.http.delete(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error posting teacher', error);
        return throwError(() => error.error.message);
      })
    );
  }

  updateActivity(id: number, activityData: Omit<Activity, 'id'>): Observable<any> {
    const url = `http://127.0.0.1:8000/activities/${id}`;
    return this.http.put(url, activityData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error posting teacher', error);
        return throwError(() => error.error.message);
      })
    );
  }

  updateMonitor(id: number, monitorData: Omit<Teacher, 'id'>): Observable<any> {
    const url = `http://127.0.0.1:8000/monitors/${id}`;
    return this.http.put(url, monitorData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error posting teacher', error);
        return throwError(() => error.error.message);
      })
    );
  }
  

  createTeacher(teacherData: Omit<Teacher, 'id'>): Observable<any> {
    const url = 'http://127.0.0.1:8000/monitors';
    return this.http.post(url, teacherData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error posting teacher', error);
        return throwError(() => error.error.message);
      })
    );
  }


  getMonitors(): Observable<Teacher[]> {
    const url = 'http://127.0.0.1:8000/monitors';
    return this.http.get<Teacher[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error posting teacher', error);
        return throwError(() => error.error.message);
      })
    );
  }

  deleteMonitor(id: number): Observable<any> {
    const url = `http://127.0.0.1:8000/monitors/${id}`;
    return this.http.delete(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error posting teacher', error);
        return throwError(() => error.error.message);
      })
    );
  }
  
}
