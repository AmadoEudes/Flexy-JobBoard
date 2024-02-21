package com.crud.card.controller;

import com.crud.card.model.ServiceResponse;
import com.crud.card.model.Tarjeta;
import com.crud.card.service.ITarjetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/Tarjeta")
@CrossOrigin("*")

public class TarjetaController {

    @Autowired
    private ITarjetaService iTarjetaService;

    @GetMapping("/list")
    public ResponseEntity<List<Tarjeta>> list(){
        var result = iTarjetaService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody Tarjeta tarjeta){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iTarjetaService.save(tarjeta);
        if (result == 1){
            serviceResponse.setMessage("Tarjeta resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Tarjeta tarjeta){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iTarjetaService.update(tarjeta);
        if (result == 1){
            serviceResponse.setMessage("Tarjeta resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<ServiceResponse> delete(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iTarjetaService.deleteById(id);
        if (result == 1){
            serviceResponse.setMessage("Tarjeta eliminado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
}
