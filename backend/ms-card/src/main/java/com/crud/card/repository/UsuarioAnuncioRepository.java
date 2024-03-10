package com.crud.card.repository;

import com.crud.card.model.UsuarioAnuncio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UsuarioAnuncioRepository implements IUsuarioAnuncioRepository{

    @Autowired
    public JdbcTemplate jdbcTemplate;

    @Override
    public List<UsuarioAnuncio> findAll() {
        String SQL = "SELECT * FROM USUARIOANUNCIO";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(UsuarioAnuncio.class));
    }

    public UsuarioAnuncio save(UsuarioAnuncio usuarioAnuncio){
        String SQL = "INSERT INTO USUARIOANUNCIO VALUES(?,?)";
        int result = jdbcTemplate.update(SQL, new Object[]{
                usuarioAnuncio.getIdAnuncio(),
                usuarioAnuncio.getIdUsuario()
        });
        if (result > 0) {
            return usuarioAnuncio;
        }
        return null;
    }
    public int deleteById(int idUsuario, int idAnuncio){
        String SQL = "DELETE FROM USUARIOANUNCIO WHERE id_usuario = ? AND id_anuncio = ?";
        return jdbcTemplate.update(SQL, new Object[]{idUsuario, idAnuncio});
    }
}
