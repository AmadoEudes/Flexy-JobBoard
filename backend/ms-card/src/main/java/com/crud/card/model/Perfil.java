package com.crud.card.model;

import lombok.Data;

@Data
public class Perfil {
    int idPerfil;
    String descripcion;
    String direccion;
    int idUsuario;
    int idAnuncio;
}
