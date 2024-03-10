package com.crud.card.repository;

import com.crud.card.model.AnuncioCategoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class AnuncioCategoriaRepository implements IAnuncioCategoriaRepository{

    @Autowired
    public JdbcTemplate jdbcTemplate;

    @Override
    public List<AnuncioCategoria> findAll() {
        String SQL = "SELECT * FROM ANUNCIOCATEGORIA";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(AnuncioCategoria.class));
    }

    public AnuncioCategoria save(AnuncioCategoria anuncioCategoria){
        String SQL = "INSERT INTO ANUNCIOCATEGORIA VALUES(?,?)";
        int result = jdbcTemplate.update(SQL, new Object[]{
                anuncioCategoria.getIdAnuncio(),
                anuncioCategoria.getIdCategoria()
        });
        if (result > 0) {
            return anuncioCategoria;
        }
        return null;
    }
    public int deleteById(int idAanuncio, int idCategoria){
        String SQL = "DELETE FROM ANUNCIOCATEGORIA WHERE id_anuncio = ? AND id_categoria = ?";
        return jdbcTemplate.update(SQL, new Object[]{idAanuncio, idCategoria});
    }
}
