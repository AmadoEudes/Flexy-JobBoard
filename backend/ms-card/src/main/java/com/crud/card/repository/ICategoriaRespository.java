package com.crud.card.repository;

import com.crud.card.model.Anuncio;
import com.crud.card.model.Categoria;

import java.util.List;

public interface ICategoriaRespository {
    public List<Categoria> findAll();
    public Categoria save(Categoria categoria);
    public Categoria update(Categoria categoria);
    public int deleteById(int id);
}
