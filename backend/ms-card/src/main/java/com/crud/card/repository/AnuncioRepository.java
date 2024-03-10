package com.crud.card.repository;

import com.crud.card.model.Anuncio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.Statement;
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
    public Anuncio save(Anuncio anuncio) {
        String SQL = "INSERT INTO ANUNCIO VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(SQL, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, anuncio.getIdUsuario());
            ps.setString(2, anuncio.getTitulo());
            ps.setString(3, anuncio.getDescripcion());
            ps.setString(4, anuncio.getCategoria());
            ps.setBigDecimal(5, BigDecimal.valueOf(anuncio.getPrecio()));
            ps.setString(6, anuncio.getDireccion());
            ps.setString(7, anuncio.getULatitud());
            ps.setString(8, anuncio.getULongitud());
            ps.setString(9, anuncio.getTiempo());
            ps.setString(10, anuncio.getGenero());
            ps.setDate(11, new java.sql.Date(anuncio.getFechaFin().getTime()));
            ps.setDate(12, new java.sql.Date(anuncio.getFechaCreacion().getTime()));
            ps.setString(13, anuncio.getRuta());
            ps.setString(14, anuncio.getEstado());
            return ps;
        }, keyHolder);

        if (keyHolder.getKey() != null) {
            anuncio.setIdAnuncio(keyHolder.getKey().intValue());
            return anuncio;
        }
        return null;
    }

    @Override
    public Anuncio update(Anuncio anuncio) {
        String SQL = "UPDATE ANUNCIO SET id_usuario=?, titulo=?, descripcion=?, categoria=?, precio=?, direccion=?, u_latitud=?, u_longitud, tiempo=?, genero=?, fecha_fin=?, fecha_creacion=?, ruta=? WHERE id_anuncio=?";
        int result = jdbcTemplate.update(SQL, new Object[]{
                anuncio.getIdUsuario(),
                anuncio.getTitulo(),
                anuncio.getDescripcion(),
                anuncio.getCategoria(),
                anuncio.getPrecio(),
                anuncio.getDireccion(),
                anuncio.getULatitud(),
                anuncio.getULongitud(),
                anuncio.getTiempo(),
                anuncio.getGenero(),
                anuncio.getFechaFin(),
                anuncio.getFechaCreacion(),
                anuncio.getRuta(),
                anuncio.getIdAnuncio()
        });
        if (result > 0) {
            return anuncio;
        }
        return null;
    }

    @Override
    public int deleteById(int id) {
        String SQL = "UPDATE ANUNCIO SET estado=0 WHERE id_anuncio=?";
        return jdbcTemplate.update(SQL, new Object[]{id});
    }
}
