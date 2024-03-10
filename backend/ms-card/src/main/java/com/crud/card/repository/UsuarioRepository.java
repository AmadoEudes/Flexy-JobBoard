package com.crud.card.repository;

import com.crud.card.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
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
    public Usuario save(Usuario usuario) {
        String SQL = "INSERT INTO USUARIO VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
        int result = jdbcTemplate.update(SQL, new Object[]{
                usuario.getNombres(),
                usuario.getApellidos(),
                usuario.getTelefono(),
                usuario.getCorreoElectronico(),
                usuario.getContrasenia(),
                usuario.getFechaNacimiento(),
                usuario.getGenero(),
                usuario.getIdentificacion(),
                usuario.getDepartamento(),
                usuario.getDescripcion(),
                usuario.getMetodoPago(),
                usuario.getEstado()
        });
        if (result > 0) {
            return usuario;
        }
        return null;
    }

    @Override
    public Usuario update(Usuario usuario) {
        String SQL = "UPDATE USUARIO SET nombres=?, apellidos=?, telefono=?, correo_electronico=?, contrasenia=?, fecha_nacimiento=?, genero=?, identificacion=?, departamento=?, descripcion=?WHERE id_usuario=?";
        int result = jdbcTemplate.update(SQL, new Object[]{
                usuario.getNombres(),
                usuario.getApellidos(),
                usuario.getTelefono(),
                usuario.getCorreoElectronico(),
                usuario.getContrasenia(),
                usuario.getFechaNacimiento(),
                usuario.getGenero(),
                usuario.getIdentificacion(),
                usuario.getDepartamento(),
                usuario.getDescripcion(),
                usuario.getMetodoPago(),
                usuario.getIdUsuario()
        });
        if (result > 0) {
            return usuario;
        }
        return null;
    }

    @Override
    public int deleteById(int id) {
        String SQL = "UPDATE USUARIO SET estado=1 WHERE id_usuario=?";
        return jdbcTemplate.update(SQL, new Object[]{id});
    }

    @Override
    public int findById(Usuario usuario) {
        String SQL = "SELECT id_usuario FROM USUARIO WHERE id_usuario = ?";
        return jdbcTemplate.queryForObject(SQL, new Object[]{usuario.getIdUsuario()}, Integer.class);
    }
}
