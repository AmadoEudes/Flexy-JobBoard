package com.crud.card.repository;

import com.crud.card.model.Perfil;

import java.util.List;

public interface IPerfilRepository {
    public List<Perfil> findAll();
    public int save(Perfil perfil);
    public int update(Perfil perfil);
    public int deleteById(int id);
}
