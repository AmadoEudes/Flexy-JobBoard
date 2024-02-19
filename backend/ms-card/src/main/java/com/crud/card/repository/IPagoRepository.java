package com.crud.card.repository;

import com.crud.card.model.Pago;

import java.util.List;

public interface IPagoRepository {
    public List<Pago> findAll();
    public int save(Pago pago);
    public int update(Pago pago);
    public int deleteById(int id);
}
