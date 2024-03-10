package com.crud.card.service;

import com.crud.card.model.Usuario;

import java.util.List;

public interface IUsuarioService {
    public List<Usuario> findAll();
    public Usuario save(Usuario usuario);
    public Usuario update(Usuario usuario);
    public int deleteById(int id);
    public int findById(Usuario usuario);
}
