import { Injectable } from '@angular/core';
import { categoriaServer } from '../apiServer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';
@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    private ApiUrl = categoriaServer.serverUrl;
    
    constructor(private http: HttpClient) { }
    
    getCategoria(): Observable<Categoria[]>{
        return this.http.get<Categoria[]>(`${this.ApiUrl}`);
        
    }
}
