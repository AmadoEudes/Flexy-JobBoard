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
        return this.httpClient.get<UsuarioModel[]>('http://localhost:9000/api/v1/usuario'+'/list').pipe(map(res => res));
    }

    saveUsuario(request: any): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/usuario'+'/save', request).pipe(map(res => res));
    }
    
    updateUsuario(request: any): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/usuario'+'/update', request).pipe(map(res => res));
    }

    deleteUsuario(id: number): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/usuario'+'/delete', id).pipe(map(res => res));
    }
} 