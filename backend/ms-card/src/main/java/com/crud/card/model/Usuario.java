package com.crud.card.model;

import lombok.Data;

import java.util.Date;

@Data
public class Usuario {
    int idUsuario;
    String nombres;
    String apellidos;
    String telefono;
    String correoElectronico;
    String contrasenia;
    Date fechaNacimiento;
    String genero;
    String identificacion;
    String departamento;
    String descripcion;
    String metodoPago;
    String estado;
}
