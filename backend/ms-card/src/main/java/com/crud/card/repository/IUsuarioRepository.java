package com.crud.card.repository;

import com.crud.card.model.Usuario;

import java.util.List;

public interface IUsuarioRepository {
    public List<Usuario> findAll();
    public Usuario save(Usuario usuario);
    public Usuario update(Usuario usuario);
    public int deleteById(int id);
    public int findById(Usuario usuario);
}
