package com.crud.card.model;

import lombok.Data;
import java.sql.Blob;

@Data
public class Usuario {
    int idUsuario;
    String nombres;
    String apellidos;
    String genero;
    String telefono;
    String correoElectronico;
    String contrasena;
    Blob fotoPerfil;
    int status;
}
