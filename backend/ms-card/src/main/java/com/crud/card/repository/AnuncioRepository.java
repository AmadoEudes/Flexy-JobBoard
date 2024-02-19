package com.crud.card.repository;

import com.crud.card.model.Anuncio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class AnuncioRepository implements IAnuncioRepository{

    @Autowired
    public JdbcTemplate jdbcTemplate;

    @Override
    public List<Anuncio> findAll() {
        String SQL = "SELECT * FROM ANUNCIO";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Anuncio.class));
    }

    @Override
    public int save(Anuncio anuncio) {
        String SQL = "INSERT INTO ANUNCIO VALUES(?,?,?,?)";
        return jdbcTemplate.update(SQL, new Object[]{
                anuncio.getTitulo(),
                anuncio.getDescripcion(),
                anuncio.getFechaAnuncio(),
                anuncio.getIdUsuario()
        });
    }

    @Override
    public int update(Anuncio anuncio) {
        String SQL = "UPDATE ANUNCIO SET Titulo=?, Descripcion=?, Fecha_Anuncio=?, ID_Usuario=? WHERE ID_Anuncio=?";
        return jdbcTemplate.update(SQL, new Object[]{
                anuncio.getTitulo(),
                anuncio.getDescripcion(),
                anuncio.getFechaAnuncio(),
                anuncio.getIdUsuario()
        });
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM ANUNCIO WHERE ID_Anuncio=?";
        return jdbcTemplate.update(SQL, new Object[]{id});
    }
}
