package com.crud.card.repository;

import com.crud.card.model.Perfil;
import com.crud.card.model.Tarjeta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class TarjetaRepository implements ITarjetaRepository{

    @Autowired
    public JdbcTemplate jdbcTemplate;
    @Override
    public List<Tarjeta> findAll() {
        String SQL = "SELECT * FROM TARJETA";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Tarjeta.class));
    }

    @Override
    public int save(Tarjeta tarjeta) {
        String SQL = "INSERT INTO TARJETA VALUES(?,?,?,?,?)";
        return jdbcTemplate.update(SQL, new Object[]{
                tarjeta.getNumeroCuenta(),
                tarjeta.getMesVencimiento(),
                tarjeta.getAnoVencimiento(),
                tarjeta.getCvc(),
                tarjeta.getNombreTitular()
        });
    }

    @Override
    public int update(Tarjeta tarjeta) {
        String SQL = "UPDATE TARJETA SET Nro_cuenta=?, Mes_vencimiento=?, Ano_vencimiento=?, CVC=?, Nombre_titular=? WHERE ID_Tarjeta=?";
        return jdbcTemplate.update(SQL, new Object[]{
                tarjeta.getNumeroCuenta(),
                tarjeta.getMesVencimiento(),
                tarjeta.getAnoVencimiento(),
                tarjeta.getCvc(),
                tarjeta.getNombreTitular()
        });
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM TARJETA WHERE ID_Tarjeta=?";
        return jdbcTemplate.update(SQL, new Object[]{id});
    }
}
