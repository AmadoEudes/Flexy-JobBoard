package com.crud.card.repository;

import com.crud.card.model.Anuncio;

import java.util.List;

public interface IAnuncioRepository {
    public List<Anuncio> findAll();
    public Anuncio save(Anuncio anuncio);
    public Anuncio update(Anuncio anuncio);
    public int deleteById(int id);
}
