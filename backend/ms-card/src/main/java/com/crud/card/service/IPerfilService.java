package com.crud.card.service;

import com.crud.card.model.Perfil;

import java.util.List;

public interface IPerfilService {
    public List<Perfil> findAll();
    public int save(Perfil perfil);
    public int update(Perfil perfil);
    public int deleteById(int id);
}
