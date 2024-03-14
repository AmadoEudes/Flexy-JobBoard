import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario-item',
  templateUrl: './usuario-item.component.html',
  styleUrls: ['./usuario-item.component.css']
})
export class UsuarioItemComponent implements OnInit {
  @Input() usuario: Usuario | undefined;
  constructor() { }

  ngOnInit() {
    console.log(this.usuario);
  }

}
