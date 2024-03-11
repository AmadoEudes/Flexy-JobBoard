import { Injectable } from '@angular/core';
import { jobServer } from '../apiServer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
@Injectable({
  providedIn: 'root'
})
export class JobService {
  private url: string = 'http://localhost:8000/api/';
  
  constructor(private http: HttpClient) { }
  

  //Obtener anuncios
  getAnuncios(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.url}jobs/`);
  }  
  //Obtener anuncio por id
  getAnuncioById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.url}job/${id}`);
  } 
  //Agregar anuncio
  addAnuncio(job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.url}jobs/`, job);
  }
  //Actualizar anuncio
  updateAnuncio(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.url}job/${id}`, job);
  }
  //Eliminar anuncio por id
  deleteAnuncioById(id: number): Observable<Job> {
    return this.http.delete<Job>(`${this.url}job/${id}`);
  }

}
