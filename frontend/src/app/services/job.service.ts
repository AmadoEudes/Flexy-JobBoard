import { Injectable } from '@angular/core';
import { jobServer } from '../apiServer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
@Injectable({
  providedIn: 'root'
})
export class JobService {
  private ApiUrl = jobServer.serverUrl;
  
  constructor(private http: HttpClient) { }
  
  getJob(): Observable<Job[]>{
    return this.http.get<Job[]>(`${this.ApiUrl}`);

  }
}
