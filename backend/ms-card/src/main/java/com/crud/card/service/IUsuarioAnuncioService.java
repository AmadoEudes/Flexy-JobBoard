package com.crud.card.service;

import com.crud.card.model.UsuarioAnuncio;

import java.util.List;

public interface IUsuarioAnuncioService {
    public List<UsuarioAnuncio> findAll();
    public UsuarioAnuncio save(UsuarioAnuncio usuarioAnuncio);
    public int deleteById(int idUsuario, int idAnuncio);
}
