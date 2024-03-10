import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class postJobService {
    
    constructor() { }
    
    postJob(credentials:any){
    console.log(credentials);
    }
}
