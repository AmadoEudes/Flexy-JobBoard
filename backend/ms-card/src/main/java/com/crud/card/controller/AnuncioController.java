package com.crud.card.controller;


import com.crud.card.model.Anuncio;
import com.crud.card.model.ServiceResponse;
import com.crud.card.service.IAnuncioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/Anuncio")
@CrossOrigin("*")

public class AnuncioController {
    @Autowired
    private IAnuncioService iAnuncioService;

    @GetMapping("/list")
    public ResponseEntity<List<Anuncio>> list(){
        var result = iAnuncioService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody Anuncio anuncio){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iAnuncioService.save(anuncio);
        if (result == 0 || result == 1){
            serviceResponse.setMessage("Anuncio registrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Anuncio anuncio){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iAnuncioService.update(anuncio);
        if (result == 1){
            serviceResponse.setMessage("Anuncio registrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<ServiceResponse> delete(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iAnuncioService.deleteById(id);
        if (result == 1){
            serviceResponse.setMessage("Anuncio eleminado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
}
