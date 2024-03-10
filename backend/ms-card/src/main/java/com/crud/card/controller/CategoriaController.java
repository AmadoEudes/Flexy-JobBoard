package com.crud.card.controller;

import com.crud.card.model.Categoria;
import com.crud.card.model.ServiceResponse;
import com.crud.card.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/Categoria")
@CrossOrigin(origins = "http://localhost:4200")

public class CategoriaController {
    @Autowired
    private ICategoriaService icategoriaService;

    @GetMapping("/list")
    public ResponseEntity<List<Categoria>> list(){
        var result = icategoriaService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody Categoria categoria){
        ServiceResponse serviceResponse = new ServiceResponse();
        Categoria result = icategoriaService.save(categoria);
        if (result != null){
            serviceResponse.setMessage("Usuario resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Categoria categoria){
        ServiceResponse serviceResponse = new ServiceResponse();
        Categoria result = icategoriaService.update(categoria);
        if (result != null){
            serviceResponse.setMessage("Usuario resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<ServiceResponse> delete(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = icategoriaService.deleteById(id);
        if (result == 1){
            serviceResponse.setMessage("Usuario eliminado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
}
