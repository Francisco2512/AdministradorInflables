import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', })
export class InflablesService {
  constructor(private http: HttpClient) {}

  getInflables(): Observable<any> {
    return this.http.get('https://us-central1-real-courses.cloudfunctions.net/getInflables');
  }
}