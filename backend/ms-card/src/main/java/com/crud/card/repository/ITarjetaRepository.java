package com.crud.card.repository;

import com.crud.card.model.Tarjeta;

import java.util.List;

public interface ITarjetaRepository {
    public List<Tarjeta> findAll();
    public int save(Tarjeta tarjeta);
    public int update(Tarjeta tarjeta);
    public int deleteById(int id);
}
