package com.crud.card.model;

import java.util.Date;

import lombok.Data;

@Data
public class Perfil {
    int idPerfil;
    String descripcion;
    String departamento;
    String DNI;
    Date fechaNacimiento;
    String metodoPago;
    int status;
    int idUsuario;
    int idAnuncio;
}
