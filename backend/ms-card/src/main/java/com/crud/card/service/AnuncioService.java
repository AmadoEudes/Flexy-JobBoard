package com.crud.card.service;

import com.crud.card.model.Anuncio;
import com.crud.card.repository.IAnuncioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnuncioService implements IAnuncioService{

    @Autowired
    public IAnuncioRepository iAnuncioRepository;

    @Override
    public List<Anuncio> findAll() {
        List<Anuncio> list;
        try{
            list=iAnuncioRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public int save(Anuncio anuncio) {
        int row;
        try{
            row=iAnuncioRepository.save(anuncio);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int update(Anuncio anuncio) {
        int row;
        try{
            row=iAnuncioRepository.update(anuncio);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try{
            row=iAnuncioRepository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }
}
