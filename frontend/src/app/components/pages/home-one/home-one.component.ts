import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-one',
  templateUrl: './home-one.component.html',
  styleUrls: ['./home-one.component.scss']
})
export class HomeOneComponent implements OnInit {
  isLoggedIn: boolean = false;
  user_login_id: string = '';
  constructor() { }

  ngOnInit(): void {
    // Verificar si hay datos de usuario en el local storage al cargar el componente
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const userDataParsed = JSON.parse(userData);
      this.isLoggedIn = true;
      this.user_login_id = userDataParsed.user_id; // O cualquier otro dato relevante del usuario
      console.log("Usuario inició sesión: " + this.user_login_id + " = " + this.isLoggedIn);

    }  
  }
  
}
