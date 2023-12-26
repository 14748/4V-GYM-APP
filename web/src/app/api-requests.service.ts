import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Activit1 } from './activities-display/activities-display.component';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  constructor(private http: HttpClient) { }

  getActivitiesByApi(): Observable<Activit1[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/activities').pipe(
      map(data => data.map(item => ({
        id: item.id,
        activity_type: item.activity_type,
        monitors: item.monitors, // Map further if needed
        date_start: item.date_start,
        date_end: item.date_end
      }))),
      catchError(error => {
        // Handle or throw the error
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
