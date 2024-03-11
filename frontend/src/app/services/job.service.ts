import { Injectable } from '@angular/core';
import { jobServer } from '../apiServer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

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
  //Buscar anuncio para detalles
  //http://localhost:8000/api/anuncios/buscar/?titulo=Pintor&u_latitud=-13.14874&u_longitud=-74.22263&fecha_creacion=2024-03-10T21:41:45.514055Z&usuario=3
  anuncioDetalles(params: any): Observable<Job[]> {
    console.log(`${this.url}anuncios/buscar/?titulo=${params.titulo}&u_latitud=${params.latitud}&u_longitud=${params.longitud}&fecha_creacion=${params.fecha_creacion}&usuario=${params.usuario}`);
    return this.http.get<Job[]>(`${this.url}anuncios/buscar/?titulo=${params.titulo}&u_latitud=${params.latitud}&u_longitud=${params.longitud}&fecha_creacion=${params.fecha_creacion}&usuario=${params.usuario}`);
  }
  // Obtener el último anuncio
  getUltimoAnuncio(): Observable<Job> {
    return this.http.get<Job[]>(`${this.url}jobs/`).pipe(
      catchError(error => {
        console.error('Error al obtener el último anuncio:', error);
        return throwError(error);
      }),
      map(anuncios => {
        // Ordenar los anuncios por su ID en orden descendente
        anuncios.sort((a, b) => b.id - a.id);
        // Devolver el primer anuncio (el que tiene el ID más alto)
        return anuncios.length > 0 ? anuncios[0] : null;
      })
    );
  }
}
