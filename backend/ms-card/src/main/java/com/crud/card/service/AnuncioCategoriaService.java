package com.crud.card.service;

import com.crud.card.model.AnuncioCategoria;
import com.crud.card.model.UsuarioAnuncio;
import com.crud.card.repository.IAnuncioCategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnuncioCategoriaService implements IAnuncioCategoriaService{

    @Autowired
    private IAnuncioCategoriaRepository iAnuncioCategoriaRepository;
    @Override
    public List<AnuncioCategoria> findAll(){
        List<AnuncioCategoria> list;
        try{
            list=iAnuncioCategoriaRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public AnuncioCategoria save(AnuncioCategoria anuncioCategoria){
        AnuncioCategoria row;
        try{
            row=iAnuncioCategoriaRepository.save(anuncioCategoria);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }
    @Override
    public int deleteById(int idAnuncio, int idCategoria){
        return iAnuncioCategoriaRepository.deleteById(idAnuncio, idCategoria);
    }
}
