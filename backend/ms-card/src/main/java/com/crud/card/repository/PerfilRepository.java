package com.crud.card.repository;

import com.crud.card.model.Perfil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class    PerfilRepository implements IPerfilRepository{

    @Autowired
    public JdbcTemplate jdbcTemplate;
    @Override
    public List<Perfil> findAll() {
        String SQL = "SELECT * FROM PERFIL";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Perfil.class));
    }

    @Override
    public int save(Perfil perfil) {
        String SQL = "INSERT INTO PERFIL VALUES(?,?,?,?)";
        return jdbcTemplate.update(SQL, new Object[]{
                perfil.getDescripcion(),
                perfil.getDireccion(),
                perfil.getIdUsuario(),
                perfil.getIdAnuncio()

        });
    }

    @Override
    public int update(Perfil perfil) {
        String SQL = "UPDATE PERFIL SET Descripcion=?, Direccion=?, ID_Usuario=?, ID_Anuncio=? WHERE ID_Perfil=?";
        return jdbcTemplate.update(SQL, new Object[]{
                perfil.getDescripcion(),
                perfil.getDireccion(),
                perfil.getIdUsuario(),
                perfil.getIdAnuncio()
        });
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM PAGO WHERE ID_Perfil=?";
        return jdbcTemplate.update(SQL, new Object[]{id});
    }
}
