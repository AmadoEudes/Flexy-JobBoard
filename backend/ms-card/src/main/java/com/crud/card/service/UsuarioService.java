package com.crud.card.service;

import com.crud.card.model.Usuario;
import com.crud.card.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService implements IUsuarioService{

    @Autowired
    public IUsuarioRepository iUsuarioRepository;

    @Override
    public List<Usuario> findAll() {
        List<Usuario> list;
        try{
            list=iUsuarioRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public int save(Usuario usuario) {
        int row;
        try{
            row=iUsuarioRepository.save(usuario);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int update(Usuario usuario) {
        int row;
        try{
            row=iUsuarioRepository.update(usuario);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try{
            row=iUsuarioRepository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }
}
