package com.crud.card.model;

import lombok.Data;

@Data
public class Tarjeta {
    int idTarjeta;
    String numeroCuenta;
    String mesVencimiento;
    String anoVencimiento;
    String cvc;
    String nombreTitular;
}
