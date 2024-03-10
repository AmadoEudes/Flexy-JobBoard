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

    getAnuncios(): Observable<AnuncioModel[]>{
        return this.httpClient.get<AnuncioModel[]>('http://localhost:9000/api/v1/Anuncio'+'/list').pipe(map(res => res));
    }

    saveAnuncio(anuncio: AnuncioModel): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/Anuncio'+'/save', anuncio).pipe(map(res => res));
    }
    
    updateAnuncio(anuncio: AnuncioModel): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/Anuncio'+'/update', anuncio).pipe(map(res => res));
    }

    deleteAnuncio(id: number): Observable<any>{
        return this.httpClient.get<any>('http://localhost:9000/api/v1/Anuncio'+'/delete/' + id).pipe(map(res => res));
    }
}