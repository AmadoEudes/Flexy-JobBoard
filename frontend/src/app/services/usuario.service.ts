import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = 'http://localhost:8000/api/';
  
  constructor(private http: HttpClient) { }

  //Obtener usuario 
  getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}users/`);
  }  
  //Obtener usuario por id
  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}user/${id}`);
  } 
  //Agregar usuario
  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}users/`, usuario);
  }
  //Actualizar usuario
  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}user/${id}`, usuario);
  }
  //Eliminar usuario por id
  deleteUsuario(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.url}user/${id}`);
  }

  
}
