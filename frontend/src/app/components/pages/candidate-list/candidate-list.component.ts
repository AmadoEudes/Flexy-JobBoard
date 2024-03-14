import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
  usuario: Usuario[] = [];
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuario().subscribe({
      next: (data: Usuario[]) => {
        this.usuario = data;
        console.log(this.usuario);
      },
      error: (error: any) => {
        console.error('Error al cargar los anuncios:', error);
      },
      complete: () => {
        console.log('Los usuarios cargaron correctamente.');
      }
    });
  }
  
}
