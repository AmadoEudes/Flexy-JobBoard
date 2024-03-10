package com.crud.card.repository;

import com.crud.card.model.AnuncioCategoria;

import java.util.List;

public interface IAnuncioCategoriaRepository {
    public List<AnuncioCategoria> findAll();
    public AnuncioCategoria save(AnuncioCategoria anuncioCategoria);
    public int deleteById(int idAnuncio, int idCategoria);
}
