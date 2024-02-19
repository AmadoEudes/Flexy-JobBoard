package com.crud.card.service;

import com.crud.card.model.Pago;
import com.crud.card.model.Perfil;
import com.crud.card.repository.IPerfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerfilService implements IPerfilService{

    @Autowired
    public IPerfilRepository iPerfilRepository;

    @Override
    public List<Perfil> findAll() {
        List<Perfil> list;
        try{
            list=iPerfilRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public int save(Perfil perfil) {
        int row;
        try{
            row=iPerfilRepository.save(perfil);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int update(Perfil perfil) {
        int row;
        try{
            row=iPerfilRepository.update(perfil);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try{
            row=iPerfilRepository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }
}
