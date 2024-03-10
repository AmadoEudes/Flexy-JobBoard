package com.crud.card.service;

import com.crud.card.model.Usuario;
import com.crud.card.model.UsuarioAnuncio;
import com.crud.card.repository.IUsuarioAnuncioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UsuarioAnuncioService implements IUsuarioAnuncioService {

    @Autowired
    private IUsuarioAnuncioRepository iUsuarioAnuncioRepository;
    @Override
    public List<UsuarioAnuncio> findAll(){
        List<UsuarioAnuncio> list;
        try{
            list=iUsuarioAnuncioRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }
    @Override
    public UsuarioAnuncio save(UsuarioAnuncio usuarioAnuncio){
        UsuarioAnuncio row;
        try{
            row=iUsuarioAnuncioRepository.save(usuarioAnuncio);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }
    @Override
    public int deleteById(int idUsuario, int idAnuncio){
        return iUsuarioAnuncioRepository.deleteById(idUsuario, idAnuncio);
    }
}
