import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  isLoggedIn: boolean = false;
  user_login_id: string = '';
  
  constructor( private usuarioService: UsuarioService) { }
  
  ngOnInit(): void {
    // Verificar si hay datos de usuario en el local storage al cargar el componente
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const userDataParsed = JSON.parse(userData);
      this.isLoggedIn = true;
      this.user_login_id = userDataParsed.user_id; // O cualquier otro dato relevante del usuario
      console.log("Usuario inició sesión: " + this.user_login_id + " = " + this.isLoggedIn);
    }  
    this.usuarioService.getUsuarioById(this.user_login_id).subscribe({
      next: (data: Usuario) => { // Change the type from Usuario[] to Usuario
        this.usuario = data; // Wrap the data in an array
        console.log(this.usuario);
      },
      error: (error: any) => {
        console.error('Error al cargar los usuarios:', error);
      },
      complete: () => {
        console.log('Los usuarios cargaron correctamente.');
      }
    })
  }

}
