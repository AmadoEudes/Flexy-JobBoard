import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  user_login_id: string = '';
  
  constructor(private router: Router, private location: Location, private loginService: LoginService) { }

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
  logOut(){
    this.loginService.logOut();
    this.isLoggedIn = false;
    this.user_login_id = '';
    console.log("Usuario cerró sesión: " + this.user_login_id);
    // Navegar a la página principal
    this.router.navigate(['/']).then(() => {
      // Esperar 100 milisegundos antes de recargar la página
      setTimeout(() => {
        this.recargarPagina();
      }, 100);
    });

  }
  recargarPagina() {
    this.location.replaceState(this.location.path());
    window.location.reload();
  }
}
