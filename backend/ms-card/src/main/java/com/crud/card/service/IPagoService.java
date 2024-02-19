package com.crud.card.service;

import com.crud.card.model.Pago;

import java.util.List;

public interface IPagoService {
    public List<Pago> findAll();
    public int save(Pago pago);
    public int update(Pago pago);
    public int deleteById(int id);
}
