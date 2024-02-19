package com.crud.card.repository;

import com.crud.card.model.Pago;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PagoRepository implements IPagoRepository{

    @Autowired
    public JdbcTemplate jdbcTemplate;
    @Override
    public List<Pago> findAll() {
        String SQL = "SELECT * FROM PAGO";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Pago.class));
    }

    @Override
    public int save(Pago pago) {
        String SQL = "INSERT INTO PAGO VALUES(?,?,?,?)";
        return jdbcTemplate.update(SQL, new Object[]{
                pago.getIdUsuario(),
                pago.getIdTarjeta(),
                pago.getFechaPago(),
                pago.getMonto()
        });
    }

    @Override
    public int update(Pago pago) {
        String SQL = "UPDATE USUARIO SET ID_Usurio=?, ID_Tarjeta=?, Monto=? ,Fecha_pago=?WHERE ID_Pago=?";
        return jdbcTemplate.update(SQL, new Object[]{
                pago.getIdUsuario(),
                pago.getIdTarjeta(),
                pago.getFechaPago(),
                pago.getMonto()
        });
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM PAGO WHERE ID_Pago=?";
        return jdbcTemplate.update(SQL, new Object[]{id});
    }
}
