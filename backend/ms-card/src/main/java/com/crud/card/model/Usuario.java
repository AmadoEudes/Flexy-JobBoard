package com.crud.card.model;

import lombok.Data;

@Data
public class Usuario {
    int idUsuario;
    String nombres;
    String apellidos;
    String genero;
    String telefono;
    String correoElectronico;
    String contrasena;
    int status;
}
