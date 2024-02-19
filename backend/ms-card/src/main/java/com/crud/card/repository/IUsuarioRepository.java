package com.crud.card.repository;

import com.crud.card.model.Usuario;

import java.util.List;

public interface IUsuarioRepository {
    public List<Usuario> findAll();
    public int save(Usuario usuario);
    public int update(Usuario usuario);
    public int deleteById(int id);
}
