package com.crud.card.service;

import com.crud.card.model.Perfil;
import com.crud.card.model.Tarjeta;
import com.crud.card.repository.ITarjetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarjetaService implements ITarjetaService{

    @Autowired
    public ITarjetaRepository iTarjetaRepository;

    @Override
    public List<Tarjeta> findAll() {
        List<Tarjeta> list;
        try{
            list=iTarjetaRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public int save(Tarjeta tarjeta) {
        int row;
        try{
            row=iTarjetaRepository.save(tarjeta);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int update(Tarjeta tarjeta) {
        int row;
        try{
            row=iTarjetaRepository.update(tarjeta);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try{
            row=iTarjetaRepository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }
}
