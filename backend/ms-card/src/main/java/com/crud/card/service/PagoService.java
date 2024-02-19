package com.crud.card.service;

import com.crud.card.model.Anuncio;
import com.crud.card.model.Pago;
import com.crud.card.repository.IAnuncioRepository;
import com.crud.card.repository.IPagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PagoService implements IPagoService{

    @Autowired
    public IPagoRepository iPagoRepository;

    @Override
    public List<Pago> findAll() {
        List<Pago> list;
        try{
            list=iPagoRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public int save(Pago pago) {
        int row;
        try{
            row=iPagoRepository.save(pago);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int update(Pago pago) {
        int row;
        try{
            row=iPagoRepository.update(pago);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try{
            row=iPagoRepository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }
}
