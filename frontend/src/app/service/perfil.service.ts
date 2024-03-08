import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, pipe } from "rxjs";
import { PerfilModel } from "../model/perfil-model";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class PerfilService{
    constructor(private httpClient: HttpClient){

    }

    getUsuarios(): Observable<PerfilModel[]>{
        return this.httpClient.get<PerfilModel[]>('http://localhost:9000/api/v1/perfil'+'/list').pipe(map(res => res));
    }

    saveUsuario(request: any): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/perfil'+'/save', request).pipe(map(res => res));
    }
    
    updateUsuario(request: any): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/perfil'+'/update', request).pipe(map(res => res));
    }

    deleteUsuario(id: number): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/perfil'+'/delete', id).pipe(map(res => res));
    }
}