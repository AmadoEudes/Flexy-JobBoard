package com.crud.card.model;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;
@Data
public class Pago {
    int idPago;
    int idUsuario;
    int idTarjeta;
    BigDecimal monto;
    private Date fechaPago;
}
