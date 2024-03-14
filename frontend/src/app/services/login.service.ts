import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  api_url: string = 'http://localhost:8000/';
  constructor(private http: HttpClient) { }
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loggedIn.asObservable();
  
  login(username: string, password: string) {
    return this.http.post<any>(this.api_url + `api/api/auth/`,
    { username, password}, httpOptions).pipe(
      map( user => {
        if(user && user.token){
          localStorage.setItem("currentUser", JSON.stringify(user));
        }

        return user;
      }

      )
    )
  }
  logOut(){
    localStorage.removeItem("currentUser");
  }
}
