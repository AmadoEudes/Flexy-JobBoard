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
        String SQL = "INSERT INTO PERFIL VALUES(?,?,?,?,?,?,?)";
        return jdbcTemplate.update(SQL, new Object[]{
                perfil.getDescripcion(),
                perfil.getDepartamento(),
                perfil.getIdentificacion(),
                perfil.getFechaNacimiento(),
                perfil.getMetodoPago(),
                perfil.getStatus(),
                perfil.getIdUsuario(),
                perfil.getIdAnuncio()

        });
    }

    @Override
    public int update(Perfil perfil) {
        String SQL = "UPDATE PERFIL SET Descripcion=?, Departamento=?, Identificacion=?, Fecha_nacimiento=?, Metodo_Pago=?, ID_Usuario=?, ID_Anuncio=? WHERE ID_Perfil=?";
        return jdbcTemplate.update(SQL, new Object[]{
                perfil.getDescripcion(),
                perfil.getDepartamento(),
                perfil.getIdentificacion(),
                perfil.getFechaNacimiento(),
                perfil.getMetodoPago(),
                perfil.getIdUsuario(),
                perfil.getIdAnuncio(),
                perfil.getIdPerfil()
        });
    }

    @Override
    public int deleteById(int id) {
        String SQL = "UPDATE PERFIL SET Status=0 WHERE ID_Perfil=?";
        return jdbcTemplate.update(SQL, new Object[]{id});
    }
}
