package com.crud.card.repository;

import com.crud.card.model.UsuarioAnuncio;

import java.util.List;

public interface IUsuarioAnuncioRepository {
    public List<UsuarioAnuncio> findAll();
    public UsuarioAnuncio save(UsuarioAnuncio usuarioAnuncio);
    public int deleteById(int idUsuario, int idAnuncio);
}
