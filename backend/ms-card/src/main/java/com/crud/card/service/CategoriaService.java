package com.crud.card.service;

import com.crud.card.model.Categoria;
import com.crud.card.repository.ICategoriaRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService implements ICategoriaService{

    @Autowired
    public ICategoriaRespository iCategoriaRespository;

    @Override
    public List<Categoria> findAll() {
        List<Categoria> list;
        try{
            list=iCategoriaRespository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public Categoria save(Categoria categoria) {
        Categoria row;
        try{
            row=iCategoriaRespository.save(categoria);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public Categoria update(Categoria categoria) {
        Categoria row;
        try{
            row=iCategoriaRespository.update(categoria);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try{
            row=iCategoriaRespository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }
}
