package com.crud.card.service;

import com.crud.card.model.Usuario;

import java.util.List;

public interface IUsuarioService {
    public List<Usuario> findAll();
    public int save(Usuario usuario);
    public int update(Usuario usuario);
    public int deleteById(int id);
}
