package com.crud.card.model;

import java.util.Date;

import lombok.Data;

@Data
public class Perfil {
    int idPerfil;
    String descripcion;
    String departamento;
    String identificacion;
    Date fechaNacimiento;
    String metodoPago;
    int status;
    int idUsuario;
    int idAnuncio;
}
