package com.crud.card.controller;

import com.crud.card.model.ServiceResponse;
import com.crud.card.model.UsuarioAnuncio;
import com.crud.card.service.IUsuarioAnuncioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/v1/UsuarioAnuncio")
@CrossOrigin(origins = "http://localhost:4200")

public class UsuarioAnuncioController{
    @Autowired
    private IUsuarioAnuncioService iUsuarioAnuncioService;

    @GetMapping("/list")
    public ResponseEntity<List<UsuarioAnuncio>> list(){
        var result = iUsuarioAnuncioService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody UsuarioAnuncio usuarioAnuncio){
        ServiceResponse serviceResponse = new ServiceResponse();
        UsuarioAnuncio result = iUsuarioAnuncioService.save(usuarioAnuncio);
        if (result != null){
            serviceResponse.setMessage("Usuario resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @GetMapping("/delete/{idUsuario}/{idAnuncio}")
    public ResponseEntity<ServiceResponse> delete(@PathVariable int idUsuario, @PathVariable int idAnuncio){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iUsuarioAnuncioService.deleteById(idUsuario, idAnuncio);
        if (result == 1){
            serviceResponse.setMessage("Usuario resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
}
