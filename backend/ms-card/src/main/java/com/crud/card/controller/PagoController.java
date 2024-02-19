package com.crud.card.controller;

import com.crud.card.model.Pago;
import com.crud.card.model.ServiceResponse;
import com.crud.card.service.IPagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/Pago")
@CrossOrigin("*")

public class PagoController {

    @Autowired
    private IPagoService iPagoService;

    @GetMapping("/list")
    public ResponseEntity<List<Pago>> list(){
        var result = iPagoService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody Pago pago){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iPagoService.save(pago);
        if (result == 1){
            serviceResponse.setMessage("Pago resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Pago pago){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iPagoService.update(pago);
        if (result == 1){
            serviceResponse.setMessage("Pago resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<ServiceResponse> delete(@RequestBody int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iPagoService.deleteById(id);
        if (result == 1){
            serviceResponse.setMessage("Pago eleminado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

}
