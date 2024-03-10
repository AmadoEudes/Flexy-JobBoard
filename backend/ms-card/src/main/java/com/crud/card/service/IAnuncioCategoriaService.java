package com.crud.card.service;

import com.crud.card.model.AnuncioCategoria;

import java.util.List;

public interface IAnuncioCategoriaService {
    public List<AnuncioCategoria> findAll();
    public AnuncioCategoria save(AnuncioCategoria anuncioCategoria);
    public int deleteById(int idAnuncio, int idCategoria);
}
