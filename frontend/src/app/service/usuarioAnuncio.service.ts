import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, pipe } from "rxjs";
import { UsuarioAnuncioModel } from "../model/usuarioAnuncio-model";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class UsuarioAnuncioService{
    constructor(private httpClient: HttpClient){

    }

    getAnuncios(): Observable<UsuarioAnuncioModel[]>{
        return this.httpClient.get<UsuarioAnuncioModel[]>('http://localhost:9000/api/v1/Anuncio'+'/list').pipe(map(res => res));
    }

    saveAnuncio(usuarioAnuncio: UsuarioAnuncioModel): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/Anuncio'+'/save', usuarioAnuncio).pipe(map(res => res));
    }
    
    updateAnuncio(usuarioAnuncio: UsuarioAnuncioModel): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/Anuncio'+'/update', usuarioAnuncio).pipe(map(res => res));
    }

    deleteAnuncio(idUsuario: number, idAnuncio: number): Observable<any>{
        return this.httpClient.post<any>('http://localhost:9000/api/v1/Anuncio'+'/delete/'+ idUsuario + '/' + idAnuncio, null).pipe(map(res => res));
    }
}