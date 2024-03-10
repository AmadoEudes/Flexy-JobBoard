package com.crud.card.service;

import com.crud.card.model.Anuncio;

import java.util.List;

public interface IAnuncioService {
    public List<Anuncio> findAll();
    public Anuncio save(Anuncio anuncio);
    public Anuncio update(Anuncio anuncio);
    public int deleteById(int id);
}
