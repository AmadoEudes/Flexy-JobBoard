package com.crud.card.service;

import com.crud.card.model.Categoria;

import java.util.List;

public interface ICategoriaService {
    public List<Categoria> findAll();
    public Categoria save(Categoria categoria);
    public Categoria update(Categoria categoria);
    public int deleteById(int id);
}
