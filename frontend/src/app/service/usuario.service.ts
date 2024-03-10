import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, pipe } from "rxjs";
import { UsuarioModel } from "../model/usuario-model";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService{
    constructor(private httpClient: HttpClient){

    }

    getUsuarios(): Observable<UsuarioModel[]>{
        return this.httpClient.get<UsuarioModel[]>('http://localhost:9000/api/v1/Usuario'+'/list').pipe(map(res => res));
    }

    saveUsuario(usuario: UsuarioModel): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/Usuario'+'/save', usuario).pipe(map(res => res));
    }
    
    updateUsuario(usuario: UsuarioModel): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/Usuario'+'/update', usuario).pipe(map(res => res));
    }

    deleteUsuario(id: number): Observable<any>{
        return this.httpClient.get<any>('http://localhost:9000/api/v1/Usuario'+'/delete/' + id).pipe(map(res => res));
    }    
} 