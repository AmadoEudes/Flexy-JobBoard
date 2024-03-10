package com.crud.card.repository;

import com.crud.card.model.Anuncio;
import com.crud.card.model.Categoria;
import com.crud.card.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoriaRepository implements ICategoriaRespository{

    @Autowired
    public JdbcTemplate jdbcTemplate;
    public List<Categoria> findAll(){
        String SQL = "SELECT * FROM CATEGORIA";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Categoria.class));
    }
    public Categoria save(Categoria categoria){
        String SQL = "INSERT INTO CATEGORIA VALUES(?,?)";
        int result = jdbcTemplate.update(SQL, new Object[]{
                categoria.getNombre(),
                categoria.getEstado()

        });
        if (result > 0) {
            return categoria;
        }
        return null;
    }
    public Categoria update(Categoria categoria){
        String SQL = "UPDATE CATEGORIA SET nombre=? WHERE id_categoria=?";
        int result = jdbcTemplate.update(SQL, new Object[]{
                categoria.getNombre(),
                categoria.getIdCategoria()
        });
        if (result > 0) {
            return categoria;
        }
        return null;
    }
    public int deleteById(int id){
        String SQL = "UPDATE CATEGORIA SET estado=0 WHERE id_categoria=?";
        return jdbcTemplate.update(SQL, new Object[]{id});
    }
}
