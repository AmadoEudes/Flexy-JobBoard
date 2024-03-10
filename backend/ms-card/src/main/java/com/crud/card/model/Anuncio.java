package com.crud.card.model;

import lombok.Data;
import java.util.Date;

@Data
public class Anuncio {
    int idAnuncio;
    int idUsuario;
    String titulo;
    String descripcion;
    String categoria;
    long precio;
    String uLatitud;
    String uLongitud;
    String tiempo;
    String genero;
    Date fechaFin;
    Date fechaCreacion;
    String ruta;
    String estado;
}
