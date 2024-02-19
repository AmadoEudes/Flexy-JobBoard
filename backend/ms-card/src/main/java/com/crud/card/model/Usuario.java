package com.crud.card.model;

import lombok.Data;

@Data
public class Usuario {
    int idUsuario;
    String nombres;
    String apellidos;
    String genero;
    int edad;
    String telefono;
    String correoElectronico;
    String contrasena;
}
