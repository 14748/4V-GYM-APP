import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Error fetching teachers'));
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
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Error fetching activity types'));
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
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Error fetching activities'));
      })
    );
  }

  createActivity(activityData: Omit<Activity, 'id'>): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/activities', activityData);
  }

  deleteActivity(id: number): Observable<any> {
    const url = `http://127.0.0.1:8000/activities/${id}`;  // Construct the URL with the activity ID
    return this.http.delete(url).pipe(
      catchError(error => {
        console.error('Error deleting activity', error);
        return throwError(() => new Error('Error deleting activity'));
      })
    );
  }

  updateActivity(id: number, activityData: Omit<Activity, 'id'>): Observable<any> {
    const url = `http://127.0.0.1:8000/activities/${id}`;  // Construct the URL with the activity ID
    return this.http.put(url, activityData).pipe(
      catchError(error => {
        console.error('Error updating activity', error);
        return throwError(() => new Error('Error updating activity'));
      })
    );
  }

  updateMonitor(id: number, monitorData: Omit<Teacher, 'id'>): Observable<any> {
    const url = `http://127.0.0.1:8000/monitors/${id}`; // Construct the URL with the monitor ID
    return this.http.put(url, monitorData).pipe(
      catchError(error => {
        console.error('Error updating monitor', error);
        return throwError(() => new Error('Error updating monitor'));
      })
    );
  }
  

  createTeacher(teacherData: Omit<Teacher, 'id'>): Observable<any> {
    const url = 'http://127.0.0.1:8000/monitors'; // Your API endpoint
    return this.http.post(url, teacherData).pipe(
      catchError(error => {
        console.error('Error posting teacher', error);
        return throwError(() => new Error('Error posting teacher'));
      })
    );
  }

  getMonitors(): Observable<Teacher[]> {
    const url = 'http://127.0.0.1:8000/monitors'; // Your API endpoint
    return this.http.get<Teacher[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching monitors', error);
        return throwError(() => new Error('Error fetching monitors'));
      })
    );
  }

  deleteMonitor(id: number): Observable<any> {
    const url = `http://127.0.0.1:8000/monitors/${id}`; // Construct the URL with the monitor ID
    return this.http.delete(url).pipe(
      catchError(error => {
        console.error('Error deleting monitor', error);
        return throwError(() => new Error('Error deleting monitor'));
      })
    );
  }
  
}
