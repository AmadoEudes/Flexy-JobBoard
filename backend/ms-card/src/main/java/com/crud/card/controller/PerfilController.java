package com.crud.card.controller;

import com.crud.card.model.Perfil;
import com.crud.card.model.ServiceResponse;
import com.crud.card.service.IPerfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/Perfil")
@CrossOrigin("*")

public class PerfilController {

    @Autowired
    private IPerfilService iPerfilService;

    @GetMapping("/list")
    public ResponseEntity<List<Perfil>> list(){
        var result = iPerfilService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody Perfil perfil){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iPerfilService.save(perfil);
        if (result == 1){
            serviceResponse.setMessage("Perfil resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Perfil perfil){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iPerfilService.update(perfil);
        if (result == 1){
            serviceResponse.setMessage("Perfil resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<ServiceResponse> delete(@RequestBody int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iPerfilService.deleteById(id);
        if (result == 1){
            serviceResponse.setMessage("Perfil eliminado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

}
