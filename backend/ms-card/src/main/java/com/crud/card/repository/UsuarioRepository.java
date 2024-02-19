package com.crud.card.repository;

import com.crud.card.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class UsuarioRepository implements IUsuarioRepository{

    @Autowired
    public JdbcTemplate jdbcTemplate;
    @Override
    public List<Usuario> findAll() {
        String SQL = "SELECT * FROM USUARIO";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Usuario.class));
    }

    @Override
    public int save(Usuario usuario) {
        String SQL = "INSERT INTO USUARIO VALUES(?,?,?,?,?,?,?)";
        return jdbcTemplate.update(SQL, new Object[]{
                usuario.getNombres(),
                usuario.getApellidos(),
                usuario.getGenero(),
                usuario.getEdad(),
                usuario.getTelefono(),
                usuario.getCorreoElectronico(),
                usuario.getContrasena()
        });
    }

    @Override
    public int update(Usuario usuario) {
        String SQL = "UPDATE USUARIO SET Nombres=?, Apellidos=?, Genero=?, Edad=?, Telefono=?, Correo_electronico=?, Contrasena=? WHERE ID_Usuario=?";
        return jdbcTemplate.update(SQL, new Object[]{
                usuario.getNombres(),
                usuario.getApellidos(),
                usuario.getGenero(),
                usuario.getEdad(),
                usuario.getTelefono(),
                usuario.getCorreoElectronico(),
                usuario.getContrasena()
        });
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM USUARIO WHERE ID_Usuario=?";
        return jdbcTemplate.update(SQL, new Object[]{id});
    }
}
