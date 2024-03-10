package com.crud.card.controller;

import com.crud.card.model.AnuncioCategoria;
import com.crud.card.model.ServiceResponse;
import com.crud.card.model.UsuarioAnuncio;
import com.crud.card.service.IAnuncioCategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/AnuncioCategoria")
@CrossOrigin(origins = "http://localhost:4200")

public class AnuncioCategoriaController {

    @Autowired
    private IAnuncioCategoriaService iAnuncioCategoriaService;

    @GetMapping("/list")
    public ResponseEntity<List<AnuncioCategoria>> list(){
        var result = iAnuncioCategoriaService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody AnuncioCategoria anuncioCategoria){
        ServiceResponse serviceResponse = new ServiceResponse();
        AnuncioCategoria result = iAnuncioCategoriaService.save(anuncioCategoria);
        if (result != null){
            serviceResponse.setMessage("Usuario resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @GetMapping("/delete/{idAnuncio}/{idCategoria}")
    public ResponseEntity<ServiceResponse> delete(@PathVariable int idAnuncio, @PathVariable int idCategoria){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iAnuncioCategoriaService.deleteById(idAnuncio, idCategoria);
        if (result == 1){
            serviceResponse.setMessage("Usuario resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

}
