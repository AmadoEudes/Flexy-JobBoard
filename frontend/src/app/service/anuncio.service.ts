import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, pipe } from "rxjs";
import { AnuncioModel } from "../model/anuncio-model";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class AnuncioService{
    constructor(private httpClient: HttpClient){

    }

    getUsuarios(): Observable<AnuncioModel[]>{
        return this.httpClient.get<AnuncioModel[]>('http://localhost:9000/api/v1/anuncio'+'/list').pipe(map(res => res));
    }

    saveUsuario(request: any): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/anuncio'+'/save', request).pipe(map(res => res));
    }
    
    updateUsuario(request: any): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/anuncio'+'/update', request).pipe(map(res => res));
    }

    deleteUsuario(id: number): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/anuncio'+'/delete', id).pipe(map(res => res));
    }
}