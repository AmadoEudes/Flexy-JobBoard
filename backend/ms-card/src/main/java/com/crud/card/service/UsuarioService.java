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
    public Usuario save(Usuario usuario) {
        Usuario row;
        try{
            row=iUsuarioRepository.save(usuario);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public Usuario update(Usuario usuario) {
        Usuario row;
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

    @Override
    public int findById(Usuario usuario){
        try {
            int foundUser = iUsuarioRepository.findById(usuario);
            if (foundUser != 0) {
                return foundUser;
            } else {
                return 0; // O
            }
        } catch (Exception ex) {
            throw ex;
        }
    }
}
