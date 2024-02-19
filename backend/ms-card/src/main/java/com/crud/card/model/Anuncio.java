package com.crud.card.model;

import lombok.Data;
import java.util.Date;

@Data
public class Anuncio {
    int idAnuncio;
    String titulo;
    String descripcion;
    Date fechaAnuncio;
    int idUsuario;
}
